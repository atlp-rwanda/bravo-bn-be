import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import { Op } from 'sequelize';
import db from '../database/models/index.js';
const Rates = db['rates'];
const Accomodation = db['accomodation'];
const tripRequests = db['tripRequest'];

export const getRates = async (req, res) => {
  try {
    const accomodationId = req.params.id;
    const accomodation = await Accomodation.findByPk(accomodationId);
    if (!accomodation) {
      return res
        .status(400)
        .json({ error: 'This accomodation does not exist!' });
    }

    const rates = await Rates.findAll({
      where: { accomodationId: accomodationId },
    });
    if (rates) {
      return res.status(200).json({
        message: 'rates fetched successfully',
        rates: rates,
        accomodationInfo: accomodation,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const createRate = catchAsync(async (req, res, next) => {
  const { accomodationId, rates } = req.body;

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
  const isItRated = await Rates.findOne({
    where: {
      requesterId: req.user.id,
      accomodationId: tripRequest.accomodationId,
    },
  });
  if (isItRated) {
    const updateRate = await Rates.update(
      {
        rating: rates,
      },
      {
        where: {
          requesterId: req.user.id,
          accomodationId: tripRequest.accomodationId,
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
