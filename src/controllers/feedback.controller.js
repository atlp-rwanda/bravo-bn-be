import db from '../database/models/index.js';
const Feedback = db['feedback'];
const Accomodation = db['accomodation'];
const tripRequests = db['tripRequest'];
import AppError from '../utils/appError';
import { Op } from 'sequelize';
import catchAsync from '../utils/catchAsync.js';

export const getFeedback = async (req, res) => {
  const feedback = await Feedback.findAll();

  return res.send({ message: 'Feedback retrieved successfully', feedback });
};

export const sendFeedback = catchAsync(async (req, res, next) => {
  const { accomodationId, feedback } = req.body;

  const tripRequest = await tripRequests.findOne({
    where: {
      accomodationId,
      requesterId: {
        [Op.and]: [`${req.user.id}`],
      },
    },
  });
  if (!tripRequest) {
    return next(
      new AppError(
        'Sorry, accomodation does not either exist or belong to you',
        401,
      ),
    );
  }
  if (tripRequest.status != 'approved') {
    return next(
      new AppError('Sorry, trip request must be approved to proceed ', 401),
    );
  }
  if (
    new Date(tripRequest.travelDate).getTime() + 24 * 60 * 60 * 1000 >=
    Date.now()
  ) {
    return next(
      new AppError(
        'Sorry,you must wait 24hrs to gain permission of rating ',
        401,
      ),
    );
  }

  const createdFeedback = await Feedback.create({
    requesterId: req.user.id,
    accomodationId: tripRequest.accomodationId,
    feedback,
  });
  return res.status(201).json({
    message: 'Feedback created successfully ✔',
    data: createdFeedback,
  });
});
