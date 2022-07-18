import db from '../database/models/index.js';
const Rates = db['rates'];
const Accomodation = db['accomodation'];
const tripRequests = db['tripRequest'];
import AppError from '../utils/appError';
import { Op } from 'sequelize';
import catchAsync from '../utils/catchAsync.js';

export const createRate = catchAsync(async (req, res, next) => {
  const { tripRequestId, rates } = req.body;

  const tripRequest = await tripRequests.findOne({
    where: {
      id: tripRequestId,
      requesterId: {
        [Op.and]: [`${req.user.id}`],
      },
    },
  });
  if (!tripRequest) {
    return next(
      new AppError(
        'Sorry, trip request does not either exist or belong to you',
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
  const isItRated = await Rates.findOne({
    where: {
      requesterId: req.user.id,
      accomodationId: tripRequest.accomodationId,
    },
  });
  console.log(isItRated);
  if (isItRated) {
    const updateRate = await Rates.update(
      {
        rates,
      },
      {
        where: {
          accommodationId: tripRequest.accommodationId,
          requesterId: {
            [Op.and]: [`${req.user.id}`],
          },
        },
      },
    );
    return res.status(201).json({
      message: 'rates updated',
      data: updateRate,
    });
  } else {
    const userRates = await Rates.create({
      requesterId: req.user.id,
      accomodationId: tripRequest.accomodationId,
      rating: rates,
    });
    return res.status(201).json({
      message: 'rates added to accomodation!',
      data: userRates,
    });
  }
});
