import jsonwebtoken  from 'jsonwebtoken';
import catchAsync  from '../utils/catchAsync';
import AppError  from '../utils/appError';
import { promisify }  from 'util';
import bcryptjs  from 'bcryptjs';
import db from '../database/models/index.js';
import {signupAuthSchema} from '../helpers/validation_schema';
import {Op} from'sequelize';

const User = db['users']
const { compare } = bcryptjs;

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
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        secure: false,
        httpOnly: true,
    };
    res.cookie('jwt', token, cookieOptions);

    user.password = undefined;

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
    if (!currentUser)
        return next(new AppError('Wrong email or password!', 401));

    const hashedPassword = await compare(req.body.password, currentUser.password);

    if (!hashedPassword)
        return next(new AppError('Wrong email or password!', 401));

    createSendToken(currentUser, 200, res);
});

export const signup = catchAsync(async (req, res, next) => {

     await signupAuthSchema.validateAsync(req.body);

    if (!req.body.password || !req.body.email) {
        return next(new AppError('Please fill empty fields!', 400));
    }
    let userEmailExist = await User.findOne({ where: { email: req.body.email } });
    let usernameExist = await User.findOne({ where: { username: req.body.username } });
    if (userEmailExist)
        return next(new AppError('Email already taken!', 409));
    if (usernameExist)
        return next(new AppError('Username already taken!', 409));

     const createUser= await User.create(req.body, {
            individualHooks: true
        });

    createSendToken(createUser, 201, res);
});

export const googleLogin = catchAsync(async (req, res, next) => {
    const googleUser = req.user;
    const {id,provider,displayName,given_name,family_name,verified,language,email,picture} = googleUser;
    
    const defineUser ={
        firstName: given_name,
        lastName: family_name,
        username: displayName,
        email: email,
        socialMediaId: id,
        provider: provider,
        isVerified: verified,
        preferredLanguage: language,
        image: picture,
        role: "requester"
    }
    let userExist = await User.findOne({ where: { 
        email: defineUser.email,
        username: {
            [Op.or]: [`${defineUser.username}`]
          },
        socialMediaId: {
            [Op.or]: [`${defineUser.socialMediaId}`]
          }
    } });
    if (userExist){
        return  createSendToken(userExist, 200, res);
    }

    const createUser= await User.create(defineUser, {
        individualHooks: true
    });
    createSendToken(createUser, 201, res);
  })

export const facebookLogin = catchAsync(async (req, res, next) => {
    const facebookUser = req.user;
    const {id,provider,displayName,name,photos} = facebookUser;
    
    const defineUser ={
        firstName: name.givenName,
        lastName: name.familyName,
        username: displayName,
        socialMediaId: id,
        provider: provider,
        image: photos[0].value,
        role: "requester"
    }
    let userExist = await User.findOne({ where: { 
        username: defineUser.username,
        socialMediaId: {
            [Op.or]: [`${defineUser.socialMediaId}`]
          }
    } });
    if (userExist){
        return  createSendToken(userExist, 200, res);
    }

    const createUser= await User.create(defineUser, {
        individualHooks: true
    });
    createSendToken(createUser, 201, res);
})


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
            new AppError('You are not logged in! please login to get access', 401)
        );
    }
    const decoded = await promisify(verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findByPk(decoded.id);

    if (!currentUser) {
        return next(
            new AppError('The user belonging to this token does no longer exist', 401)
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 24c109d (chore(setup): set up an empty Express Boilerplate with dotenv)
