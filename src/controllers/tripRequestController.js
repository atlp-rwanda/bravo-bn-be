import db from '../database/models/index';
import Sequelize from 'sequelize';
import {
  tripRequestSchema,
  tripRequestUpdateSchema,
} from '../helpers/validation_schema';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
const tripRequests = db['tripRequest'];
const accomodations = db['accomodation'];
const locations = db['Location'];
const Room = db['Room'];
const users = db['users'];
import { Op } from 'sequelize';
import Email from '../utils/email';

// create a 'Trip Request' as requester
export const createTripRequest = catchAsync(async (req, res) => {
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
  const room = await Room.findOne({
    where: {
      id: req.body.roomId,
      taken: {
        [Op.and]: [false],
      },
    },
  });
  if (!location) {
    return res.status(404).json({ message: `Sorry, Location Not Found` });
  }
  if (!accomodation) {
    return res.status(404).json({ message: ` Sorry, Accomodation Not Found` });
  }
  if (!room) {
    return res
      .status(404)
      .json({ message: `Sorry, room is taken or not found` });
  }

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
    roomId: req.body.roomId,
    passportName: req.body.passportName,
    passportNumber: req.body.passportNumber,
  };
  await Room.update(
    {
      taken: true,
      userId: req.user.id,
    },
    { where: { id: req.body.roomId } },
  );
  await tripRequests.create(trip);
  trip.accomodationId = undefined;
  trip.accomodation = accomodation;
  trip.roomId = undefined;
  trip.room = room;
  res.cookie('passportName', req.body.passportName, {
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
  });
  res.cookie('passportNumber', req.body.passportNumber, {
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
  });
  const url = `${req.protocol}://${req.get('host')}/api/v1/user/trip/get/${
    newTrip.id
  }`;
  const manager = await users.findOne({ where: { role: 'manager' } });
  const requester = await users.findOne({ where: { id: req.user.id } });
  await new Email(manager, url).newReqManagerNotif();
  await new Email(requester, url).newReqRequesterNotif();
  return res.status(201).json({ status: 'success', data: trip });
});
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
      where: {
        id: requestId,
        requesterId: {
          [Op.and]: [`${userId}`],
        },
      },
    });

    if (!tripRequest || tripRequest.status !== 'pending') {
      return res.status(404).json({
        message: `Trip Request is Not in pending status or Not Exist!`,
      });
    } else {
      await Room.update(
        {
          taken: false,
          userId: null,
        },
        { where: { id: tripRequest.roomId } },
      );
      await tripRequests.destroy({
        where: { id: requestId, requesterId: userId },
      });

      const manager = await users.findOne({ where: { role: 'manager' } });
      const requester = await users.findOne({ where: { id: userId } });
      await new Email(manager).deletedRequest();
      await new Email(requester).deletedRequest();
      res.status(200).json({ message: 'Trip Request Deleted successfully' });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getTripRequestStat = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  let { year, month, day } = req.body;
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

    return response.length > 0
      ? res.status(200).json({ status: 'success', data: response })
      : next(
          new AppError(
            `Trip Request not found with date ${year} ${day} ${month}`,
            404,
          ),
        );
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

    return response.length > 0
      ? res.status(200).json({ status: 'success', data: response })
      : next(
          new AppError(
            `Trip Request not found with year ${year} and month of ${month} `,
            404,
          ),
        );
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

    return response.length > 0
      ? res.status(200).json({ status: 'success', data: response })
      : next(
          new AppError(
            `Trip Request not found with day ${day} and month of ${month} `,
            404,
          ),
        );
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

    return response.length > 0
      ? res.status(200).json({ status: 'success', data: response })
      : next(
          new AppError(
            `Trip Request not found with year ${year} and day ${day} `,
            404,
          ),
        );
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

    return response.length > 0
      ? res.status(200).json({ status: 'success', data: response })
      : next(new AppError(`Trip Request not found with year ${year}`, 404));
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

    return response.length > 0
      ? res.status(200).json({ status: 'success', data: response })
      : next(new AppError(`Trip Request not found with month ${month}`, 404));
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

    return response.length > 0
      ? res.status(200).json({ status: 'success', data: response })
      : next(new AppError(`Trip Request not found with day ${day}`, 404));
  }

  return next(new AppError(`Trip Request not found!`, 404));
});

export const mostTavelledDestinations = catchAsync(async (req, res, next) => {
  let allLocations = await locations.findAll({
    attributes: {
      include: [
        [
          Sequelize.fn('COUNT', Sequelize.col('tripRequest.id')),
          'totalTravels',
        ],
      ],
    },
    include: [
      {
        model: tripRequests,
        where: { status: 'approved' },
        attributes: [],
        as: 'tripRequest',
      },
    ],
    group: ['Location.id'],
  });
  if (allLocations.length === 0)
    return res.status(404).json({
      status: 'fail',
      message: 'Sorry, no most recent location found.',
    });
  allLocations.sort((a, b) =>
    a.dataValues.totalTravels < b.dataValues.totalTravels ? 1 : -1,
  );
  return res.status(200).json({ status: 'success', data: allLocations });
});

export const createMultiTripRequest = async (req, res, next) => {
  if (req.user.role !== 'requester') {
    return res
      .status(403)
      .json({ message: 'Unauthorized to create trip request' });
  }
  const trips = req.body;

  let tripError;
  let tripAppError;

  const createTrips = trips.map(async (trip_) => {
    try {
      const accomodation = await accomodations.findOne({
        where: { id: trip_.accomodationId },
      });

      const location = await locations.findOne({
        where: { id: trip_.goingTo },
      });
      const room = await Room.findOne({
        where: {
          id: trip_.roomId,
          taken: {
            [Op.and]: [false],
          },
          accomodationId: {
            [Op.and]: [`${trip_.accomodationId}`],
          },
        },
      });
      if (!location) {
        return (tripError = 'Sorry, some locations can not be found!');
      }
      if (!accomodation) {
        return (tripError = ` Sorry, some accomodations can't be found!`);
      }
      if (!room) {
        return (tripError = `Sorry, some rooms are taken or not found`);
      }

      const type = trip_.returnDate == null ? 'One way trip' : 'Round trip';
      const status = 'pending';
      const trip = {
        leavingFrom: trip_.leavingFrom,
        goingTo: trip_.goingTo,
        travelDate: trip_.travelDate,
        returnDate: trip_.returnDate,
        travelReason: trip_.travelReason,
        tripType: type,
        status: status,
        requesterId: req.user.id,
        accomodationId: trip_.accomodationId,
        roomId: trip_.roomId,
        passportName: req.body.passportName,
        passportNumber: req.body.passportNumber,
      };
      await Room.update(
        {
          taken: true,
          userId: req.user.id,
        },
        { where: { id: trip_.roomId } },
      );
      await tripRequests.create(trip);
    } catch (error) {
      return (tripAppError = error);
    }
  });

  await Promise.all(createTrips);
  if (tripError) return next(new AppError(tripError, 404));
  if (tripAppError) return next(tripAppError);
  return res.status(201).json({
    status: 'success',
    message: 'All of your trips were successfully requested.',
  });
};
export const approveTripRequest = catchAsync(async (req, res, next) => {
  if (req.user.dataValues.role === 'manager') {
    const tripRequest = await tripRequests.findByPk(req.params.id);
    if (!tripRequest) {
      return next(new AppError('Trip request not found', 404));
    }
    if (tripRequest.status !== 'pending') {
      return next(
        new AppError('Trip request is already approved or rejected', 400),
      );
    }
    const updatedTripRequest = await tripRequests.update(
      {
        status: 'approved',
      },
      {
        where: {
          id: tripRequest.id,
        },
      },
    );
    if (updatedTripRequest) {
      const url = `${req.protocol}://${req.get('host')}/api/v1/user/trip/get/${
        tripRequest.id
      }`;

      const manager = await users.findOne({ where: { role: 'manager' } });
      const requester = await users.findOne({
        where: { id: tripRequest.requesterId },
      });
      await new Email(manager, url).approvedRequest();
      await new Email(requester, url).approvedRequest();
      return res.status(200).json({
        status: true,
        message: 'Trip request approved successfully',
      });
    }
  } else {
    return next(
      new AppError('You are not authorized to approve this trip request', 401),
    );
  }
});

export const rejectTripRequest = catchAsync(async (req, res, next) => {
  if (req.user.dataValues.role === 'manager') {
    const tripRequest = await tripRequests.findByPk(req.params.id);
    if (!tripRequest) {
      return next(new AppError('Trip request not found', 404));
    }
    if (tripRequest.status !== 'pending') {
      return next(
        new AppError('Trip request is already approved or rejected', 400),
      );
    }
    const updatedTripRequest = await tripRequests.update(
      {
        status: 'rejected',
      },
      {
        where: {
          id: tripRequest.id,
        },
      },
    );
    if (updatedTripRequest) {
      const url = `${req.protocol}://${req.get('host')}/api/v1/user/trip/get/${
        tripRequest.id
      }`;
      const manager = await users.findOne({ where: { role: 'manager' } });
      const requester = await users.findOne({
        where: { id: tripRequest.requesterId },
      });
      await new Email(manager, url).rejectedRequest();
      await new Email(requester, url).rejectedRequest();
      return res.status(200).json({
        status: true,
        message: 'Trip request rejected successfully',
      });
    }
  } else {
    return next(
      new AppError('You are not authorized to reject this trip request', 401),
    );
  }
});
