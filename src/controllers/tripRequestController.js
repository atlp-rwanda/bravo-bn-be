import db from '../database/models/index';
import {
  tripRequestSchema,
  tripRequestUpdateSchema,
} from '../helpers/validation_schema';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
const tripRequests = db['tripRequest'];
const accomodations = db['accomodation'];
const locations = db['Location'];
import { Op } from 'sequelize';

// create a 'Trip Request' as requester
export const createTripRequest = async (req, res) => {
  try {
    if (req.user.role !== 'requester') {
      return res
        .status(403)
        .json({ message: 'Unauthorized to create trip request' });
    }
    await tripRequestSchema.validateAsync(req.body);

    //check if location and accomodation chosen are available
    const accomodation = await accomodations.findOne({
      where: { id: req.body.accomodationId },
    });

    const location = await locations.findOne({
      where: { id: req.body.goingTo },
    });
    if (!location || !accomodation) {
      return res
        .status(404)
        .json({ message: `Location or Accomodation Not found` });
    } else {
      const type = req.body.returnDate == null ? 'One way trip' : 'Round trip';
      const status = 'pending';
      const trip = {
        leavingFrom: req.body.leavingFrom,
        goingTo: req.body.goingTo,
        travelDate: req.body.travelDate,
        returnDate: req.body.returnDate,
        travelReason: req.body.travelReason,
        tripType: type,
        status: status,
        requesterId: req.user.id,
        accomodationId: req.body.accomodationId,
      };
      await tripRequests.create(trip);
      trip.accomodationId = undefined;
      trip.accomodation = accomodation;
      return res.status(201).json({ status: 'success', data: trip });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// retrieve single trip request as requester
export const getSingleTripRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const requestId = req.params.id;

    if (req.user.role == 'requester' || req.user.role == 'manager') {
      let response;
      req.user.role == 'requester'
        ? (response = await tripRequests.findOne({
            where: { id: requestId, requesterId: userId },
            include: [
              {
                model: accomodations,
                as: 'accomodation',
                attributes: { exclude: ['createdAt', 'updatedAt'] },
              },
            ],
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'accomodationId'],
            },
          }))
        : (response = await tripRequests.findOne({
            where: { id: requestId },
            include: [
              {
                model: accomodations,
                as: 'accomodation',
                attributes: { exclude: ['createdAt', 'updatedAt'] },
              },
            ],
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'accomodationId'],
            },
          }));

      response
        ? res.status(200).json({ status: 'success', data: response })
        : res.status(404).json({
            success: false,
            message: `Trip Request not found!`,
          });
    } else {
      return res.status(403).json({
        status: 'fail',
        message: 'UnAuthorized to retrieve trip requests',
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllTripRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    if (req.user.role == 'requester' || req.user.role == 'manager') {
      let response;
      req.user.role == 'requester'
        ? (response = await tripRequests.findAll({
            where: { requesterId: userId },
            include: [
              {
                model: accomodations,
                as: 'accomodation',
                attributes: { exclude: ['createdAt', 'updatedAt'] },
              },
            ],
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'accomodationId'],
            },
          }))
        : (response = await tripRequests.findAll({
            include: [
              {
                model: accomodations,
                as: 'accomodation',
                attributes: { exclude: ['createdAt', 'updatedAt'] },
              },
            ],
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'accomodationId'],
            },
          }));

      response
        ? res.status(200).json({ status: 'success', data: response })
        : res.status(404).json({
            success: false,
            message: `Trip Request not found!`,
          });
    } else {
      return res.status(403).json({
        status: 'fail',
        message: 'UnAuthorized to retrieve trip requests',
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTripRequest = async (req, res) => {
  try {
    if (req.user.role !== 'requester') {
      return res
        .status(403)
        .json({ message: 'Unauthorized to update trip request' });
    }
    const requestId = req.params.id;
    const userId = req.user.id;

    const tripRequest = await tripRequests.findOne({
      where: { id: requestId },
    });

    if (!tripRequest || tripRequest.status !== 'pending') {
      return res.status(404).json({
        status: 'fail',
        message: `Trip Request is Not in pending status or Not Exist!`,
      });
    } else {
      await tripRequestUpdateSchema.validateAsync(req.body);

      const status = 'pending';
      const type = req.body.returnDate == null ? 'One way trip' : 'Round trip';
      const returnDate = type == 'One way trip' ? null : req.body.returnDate;

      const updatedTrip = {
        leavingFrom: req.body.leavingFrom,
        travelDate: req.body.travelDate,
        returnDate: returnDate,
        travelReason: req.body.travelReason,
        tripType: type,
        status: status,
        requesterId: req.user.id,
      };

      await tripRequests
        .update(updatedTrip, { where: { id: requestId, requesterId: userId } })
        .then((num) => {
          if (num == 1) {
            res.status(201).send({
              message: `Trip request  Updated Successfully`,
            });
          } else {
            res.send({
              message: `Trip request not Updated.`,
            });
          }
        });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteTripRequest = async (req, res) => {
  try {
    if (req.user.role !== 'requester') {
      return res
        .status(403)
        .json({ message: 'Unauthorized to delete trip request' });
    }
    const requestId = req.params.id;
    const userId = req.user.id;

    const tripRequest = await tripRequests.findOne({
      where: { id: requestId, requesterId: userId },
    });

    if (!tripRequest || tripRequest.status !== 'pending') {
      return res.status(404).json({
        message: `Trip Request is Not in pending status or Not Exist!`,
      });
    } else {
      await tripRequests.destroy({
        where: { id: requestId, requesterId: userId },
      });
      res.status(200).json({ message: 'Trip Request Deleted successfully' });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getTripRequestStat = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  let { year, month, day } = req.query;
  month = month?.replace(month[0], month[0].toUpperCase());

  let response;

  if (year && month && day) {
    response = await tripRequests.findAll({
      where: {
        travelDate: {
          [Op.like]: `%${month} ${day} ${year}%`,
        },
        requesterId: userId,
        status: 'approved',
      },
      include: [
        {
          model: accomodations,
          as: 'accomodation',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'accomodationId'],
      },
    });

    response.length > 0
      ? res.status(200).json({ status: 'success', data: response })
      : next(
          new AppError(
            `Trip Request not found with date ${year} ${day} ${month}`,
            404,
          ),
        );
    return;
  }

  if (year && month) {
    response = await tripRequests.findAll({
      where: {
        travelDate: {
          [Op.like]: `%${year}%`,
          [Op.like]: `%${month}%`,
        },
        requesterId: userId,
        status: 'approved',
      },
      include: [
        {
          model: accomodations,
          as: 'accomodation',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'accomodationId'],
      },
    });

    response.length > 0
      ? res.status(200).json({ status: 'success', data: response })
      : next(
          new AppError(
            `Trip Request not found with year ${year} and month of ${month} `,
            404,
          ),
        );
    return;
  }
  if (day && month) {
    response = await tripRequests.findAll({
      where: {
        travelDate: {
          [Op.like]: `%${day}%`,
          [Op.like]: `%${month}%`,
        },
        requesterId: userId,
        status: 'approved',
      },
      include: [
        {
          model: accomodations,
          as: 'accomodation',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'accomodationId'],
      },
    });

    response.length > 0
      ? res.status(200).json({ status: 'success', data: response })
      : next(
          new AppError(
            `Trip Request not found with day ${day} and month of ${month} `,
            404,
          ),
        );
    return;
  }
  if (year && day) {
    response = await tripRequests.findAll({
      where: {
        travelDate: {
          [Op.like]: `%${year}%`,
          [Op.like]: `%${day}%`,
        },
        requesterId: userId,
        status: 'approved',
      },
      include: [
        {
          model: accomodations,
          as: 'accomodation',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'accomodationId'],
      },
    });

    response.length > 0
      ? res.status(200).json({ status: 'success', data: response })
      : next(
          new AppError(
            `Trip Request not found with year ${year} and day ${day} `,
            404,
          ),
        );
    return;
  }

  if (year) {
    response = await tripRequests.findAll({
      where: {
        travelDate: {
          [Op.like]: `% ${year} %`,
        },
        requesterId: userId,
        status: 'approved',
      },
      include: [
        {
          model: accomodations,
          as: 'accomodation',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'accomodationId'],
      },
    });

    response.length > 0
      ? res.status(200).json({ status: 'success', data: response })
      : next(new AppError(`Trip Request not found with year ${year}`, 404));
    return;
  }

  if (month) {
    response = await tripRequests.findAll({
      where: {
        travelDate: {
          [Op.like]: `% ${month} %`,
        },
        requesterId: userId,
        status: 'approved',
      },
      include: [
        {
          model: accomodations,
          as: 'accomodation',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'accomodationId'],
      },
    });

    response.length > 0
      ? res.status(200).json({ status: 'success', data: response })
      : next(new AppError(`Trip Request not found with month ${month}`, 404));
    return;
  }
  if (day) {
    response = await tripRequests.findAll({
      where: {
        travelDate: {
          [Op.like]: `% ${day} %`,
        },
        requesterId: userId,
        status: 'approved',
      },
      include: [
        {
          model: accomodations,
          as: 'accomodation',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'accomodationId'],
      },
    });

    response.length > 0
      ? res.status(200).json({ status: 'success', data: response })
      : next(new AppError(`Trip Request not found with day ${day}`, 404));
    return;
  }

  return next(new AppError(`Trip Request not found!`, 404));
});
