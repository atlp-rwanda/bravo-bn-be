import db from '../database/models/index';
import {
  tripRequestSchema,
  tripRequestUpdateSchema,
} from '../helpers/validation_schema';
const tripRequests = db['tripRequest'];
const accomodations = db['accomodation'];
const locations = db['Location'];

// create a 'Trip Request' as requester
export const createTripRequest = async (req, res) => {
  try {
    if (req.user.role !== 'requester') {
      return res
        .status(403)
        .json({ message: 'Unauthorized to create trip request' });
    }
    await tripRequestSchema.validateAsync(req.body);

    //check if accomodation chosen is available
    const accomodation = await accomodations.findOne({
      where: { id: req.body.accomodationId },
    });

    const location = await locations.findOne({
      where: { id: req.body.goingTo },
    });
    if (!location) {
      res
        .status(404)
        .json({ message: `Location with id= ${req.body.goingTo} Not Found` });
    }

    if (accomodation) {
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
    } else {
      return res.status(404).json({
        message: `accomodation with id= ${req.body.accomodationId} Not Found`,
      });
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

    if (req.user.role == 'requester') {
      const trip = await tripRequests.findOne({
        where: { id: requestId, requesterId: userId },
        include: [
          {
            model: accomodations,
            as: 'accomodation',
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
        ],
        attributes: { exclude: ['createdAt', 'updatedAt', 'accomodationId'] },
      });

      if (!trip) {
        return res.status(404).json({
          success: false,
          message: `Trip Requests  with id=  ${requestId} Not Found!`,
        });
      } else {
        return res.status(200).json({ status: 'success', data: trip });
      }
    } else if (req.user.role == 'manager') {
      const trip = await tripRequests.findOne({
        where: { id: requestId },
        include: [
          {
            model: accomodations,
            as: 'accomodation',
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
        ],
        attributes: { exclude: ['createdAt', 'updatedAt', 'accomodationId'] },
      });

      if (!trip) {
        return res.status(404).json({
          status: 'fail',
          message: ` Trip Request with id= ${requestId} Not Found`,
        });
      } else {
        return res.status(200).json({ status: 'success', data: trip });
      }
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

    if (req.user.role == 'requester') {
      const trips = await tripRequests.findAll({
        where: { requesterId: userId },
        include: [
          {
            model: accomodations,
            as: 'accomodation',
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
        ],
        attributes: { exclude: ['createdAt', 'updatedAt', 'accomodationId'] },
      });

      if (!trips) {
        return res.status(404).json({
          message: `there are no Trip Requests assigned to ${userId}`,
        });
      } else {
        return res.status(200).json({ status: 'success', data: trips });
      }
    } else if (req.user.role == 'manager') {
      const trips = await tripRequests.findAll({
        include: [
          {
            model: accomodations,
            as: 'accomodation',
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
        ],
        attributes: { exclude: ['createdAt', 'updatedAt', 'accomodationId'] },
      });

      if (!trips) {
        return res
          .status(404)
          .json({ status: 'fail', message: `No Trip Requests found` });
      } else {
        return res.status(200).json({ status: 'success', data: trips });
      }
    } else {
      return res
        .status(403)
        .json({ message: 'Unauthorized to retrive trip request' });
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

    if (!tripRequest) {
      return res.status(404).json({
        status: 'fail',
        message: `Trip Request with id = ${requestId} Not Found!`,
      });
    }

    if (tripRequest.status == 'pending') {
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
              message: `Trip request with id= ${requestId} Updated Successfully`,
            });
          } else {
            res.send({
              message: `Trip request with id= ${requestId} Not Updated.`,
            });
          }
        });
    } else {
      return res.status(404).json({
        message: `Trip Request with id = ${requestId} is approved or rejected`,
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

    if (!tripRequest) {
      return res
        .status(404)
        .json({ message: `Trip Request with id = ${requestId} Not Found!` });
    }

    if (tripRequest.status == 'pending') {
      await tripRequests.destroy({
        where: { id: requestId, requesterId: userId },
      });
      res.status(200).json({ message: 'Trip Request Deleted successfully' });
    } else {
      return res.status(404).json({
        message: `Trip Request with id = ${requestId} is approved or rejected`,
      });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
