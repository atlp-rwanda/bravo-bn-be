import db from '../database/models/index.js';
const Tripss = db['tripRequest'];
import { Op } from 'sequelize';
export const searchTrip = async (req, res) => {
  try {
    let { searchTerm } = req.params;
    if (req.user.dataValues.role == 'manager') {
      const tripss = await Tripss.findAndCountAll({
        where: {
          [Op.or]: [
            {
              leavingFrom: {
                [Op.iLike]: `%${searchTerm}%`,
              },
            },
            {
              travelDate: {
                [Op.iLike]: `%${searchTerm}%`,
              },
            },
            {
              returnDate: {
                [Op.iLike]: `%${searchTerm}%`,
              },
            },
            {
              status: {
                [Op.iLike]: `%${searchTerm}%`,
              },
            },
            {
              travelReason: {
                [Op.iLike]: `%${searchTerm}%`,
              },
            },
            {
              tripType: {
                [Op.iLike]: `%${searchTerm}%`,
              },
            },
            {
              requesterId: searchTerm.match(/^[0-9]+$/) ? searchTerm : 0,
            },
            {
              goingTo: searchTerm.match(/^[0-9]+$/) ? searchTerm : 0,
            },
          ],
        },
      });
      res.status(200).json({
        status: 'success',
        data: {
          tripss,
        },
      });
    } else if (req.user.dataValues.role == 'requester') {
      const tripss = await Tripss.findAndCountAll({
        where: {
          requesterId: req.user.dataValues.id,
          [Op.or]: [
            {
              leavingFrom: {
                [Op.iLike]: `%${searchTerm}%`,
              },
            },
            {
              travelDate: {
                [Op.iLike]: `%${searchTerm}%`,
              },
            },
            {
              returnDate: {
                [Op.iLike]: `%${searchTerm}%`,
              },
            },
            {
              status: {
                [Op.iLike]: `%${searchTerm}%`,
              },
            },
            {
              travelReason: {
                [Op.iLike]: `%${searchTerm}%`,
              },
            },
            {
              tripType: {
                [Op.iLike]: `%${searchTerm}%`,
              },
            },
            {
              requesterId: searchTerm.match(/^[0-9]+$/) ? searchTerm : 0,
            },
            {
              goingTo: searchTerm.match(/^[0-9]+$/) ? searchTerm : 0,
            },
          ],
        },
      });
      res.status(200).json({
        status: 'success',
        data: {
          tripss,
        },
      });
    } else {
      return res
        .status(403)
        .json({ status: 'fail', message: 'not traveler admin' });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
