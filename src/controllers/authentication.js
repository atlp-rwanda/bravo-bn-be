import jsonwebtoken from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import { promisify } from 'util';
import bcryptjs from 'bcryptjs';
import db from '../database/models/index.js';
import { signupAuthSchema } from '../helpers/validation_schema';
import { Op } from 'sequelize';
import crypto from 'crypto';
import Email from '../utils/email';
import createNotification from '../services/notification.service';

const { randomBytes, createHash } = crypto;

const User = db['users'];
const { hash, compare } = bcryptjs;

const { sign, verify } = jsonwebtoken;

const signToken = (id) => {
  return sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    secure: false,
    httpOnly: true,
  };
  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;
  user.passwordChangedAt = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetToken = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

export const login = catchAsync(async (req, res, next) => {
  if (!req.body.password || !req.body.email) {
    return next(new AppError('Please fill empty fields!', 400));
  }

  let currentUser = await User.findOne({ where: { email: req.body.email } });
  if (!currentUser) return next(new AppError("User doesn't exist", 401));

  const hashedPassword = await compare(req.body.password, currentUser.password);

  if (!hashedPassword)
    return next(new AppError('Wrong email or password!', 401));
  if (!currentUser.isVerified)
    return next(new AppError('Please verify your email first!', 401));

  createSendToken(currentUser, 200, res);
});

export const signup = catchAsync(async (req, res, next) => {
  await signupAuthSchema.validateAsync(req.body);

  if (!req.body.password || !req.body.email) {
    return next(new AppError('Please fill empty fields!', 400));
  }
  let userEmailExist = await User.findOne({ where: { email: req.body.email } });
  let usernameExist = await User.findOne({
    where: { username: req.body.username },
  });
  if (userEmailExist) return next(new AppError('Email already taken!', 409));
  if (usernameExist) return next(new AppError('Username already taken!', 409));

  const verificationToken = randomBytes(32).toString('hex');
  req.body.verificationToken = createHash('sha256')
    .update(verificationToken)
    .digest('hex');
  req.body.isVerified = false;
  req.body.password = await hash(req.body.password, 12);
  const createUser = await User.create(req.body, {
    individualHooks: true,
  });

  const url = `${req.protocol}://${req.get(
    'host',
  )}/api/v1/user/auth/verify-email/${verificationToken}`;

  try {
    await new Email(createUser, url).sendWelcome();
  } catch (err) {
    console.log(err);
  }

  createSendToken(createUser, 201, res);
  createNotification(
    createUser.id,
    'welcome to Barefoot nomad',
    'Your safety is our high priority, so please verify your email',
  );
});

export const verifyEmail = catchAsync(async (req, res) => {
  const token = createHash('sha256').update(req.params.token).digest('hex');

  const user = await User.findOne({ where: { verificationToken: token } });
  if (user) {
    (user.verificationToken = null), (user.isVerified = true);
    await user.save();
    res.status(201).json({
      message: 'Email validated successfully.',
    });
  } else {
    res.status(409).json({
      message: 'Sorry, your validation token is invalid or expired. ',
    });
  }
});

export const googleLogin = catchAsync(async (req, res, next) => {
  const googleUser = req.user;
  const {
    id,
    provider,
    displayName,
    given_name,
    family_name,
    verified,
    language,
    email,
    picture,
  } = googleUser;

  const defineUser = {
    firstName: given_name,
    lastName: family_name,
    username: displayName,
    email: email,
    socialMediaId: id,
    provider: provider,
    isVerified: verified,
    preferredLanguage: language,
    image: picture,
    role: 'requester',
  };
  let userExist = await User.findOne({
    where: {
      email: defineUser.email,
      username: {
        [Op.or]: [`${defineUser.username}`],
      },
      socialMediaId: {
        [Op.or]: [`${defineUser.socialMediaId}`],
      },
    },
  });
  if (userExist) {
    return createSendToken(userExist, 200, res);
  }

  const createUser = await User.create(defineUser, {
    individualHooks: true,
  });
  createSendToken(createUser, 201, res);
});

export const facebookLogin = catchAsync(async (req, res, next) => {
  const facebookUser = req.user;
  const { id, provider, displayName, name, photos } = facebookUser;

  const defineUser = {
    firstName: name.givenName,
    lastName: name.familyName,
    username: displayName,
    socialMediaId: id,
    provider: provider,
    image: photos[0].value,
    role: 'requester',
  };
  let userExist = await User.findOne({
    where: {
      username: defineUser.username,
      socialMediaId: {
        [Op.or]: [`${defineUser.socialMediaId}`],
      },
    },
  });
  if (userExist) {
    return createSendToken(userExist, 200, res);
  }

  const createUser = await User.create(defineUser, {
    individualHooks: true,
  });
  createSendToken(createUser, 201, res);
});

export const protect = catchAsync(async (req, res, next) => {
  let token = 'loggedout';
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }
  if (!token || token.length === 4 || token === 'loggedout') {
    return next(
      new AppError('You are not logged in! please login to get access', 401),
    );
  }
  const decoded = await promisify(verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findByPk(decoded.id);

  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist',
        401,
      ),
    );
  }

  req.user = currentUser;
  next();
});

export const logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success', data: null });
};

export const forgotPassword = catchAsync(async (req, res, next) => {
  const verifiedUser = await User.findOne({ where: { email: req.body.email } });
  if (!verifiedUser) {
    return next(new AppError('There is no user with email address.', 404));
  }
  const resetToken = randomBytes(32).toString('hex');

  const passwordResetToken = createHash('sha256')
    .update(resetToken)
    .digest('hex');

  const passwordResetExpires = Date.now() + 10 * 60 * 1000;

  await verifiedUser.update({ passwordResetToken, passwordResetExpires });
  await verifiedUser.save();

  const resetURL = `${req.protocol}://${req.get(
    'host',
  )}/api/v1/user/resetpassword/${resetToken}`;

  try {
    await new Email(verifiedUser, resetURL).sendPasswordReset();
    res.status(200).json({
      status: 'success',
      message: 'Password Reset sent to your Email',
    });
  } catch (err) {
    console.log(err);
    await verifiedUser.update({
      passwordResetToken: '',
      passwordResetExpires: '',
    });
    await verifiedUser.save();

    return next(
      new AppError('There was an error sending email. Try again later.', 500),
    );
  }
});

export const resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  let userExist = await User.findOne({
    where: {
      passwordResetToken: hashedToken,
    },
  });
  if (!userExist)
    return next(new AppError('Token is invalid or has expired', 409));
  await userExist.update({
    password: await hash(req.body.password, 12),
    passwordResetToken: '',
    passwordResetExpires: '',
  });

  createSendToken(userExist, 200, res);
});
