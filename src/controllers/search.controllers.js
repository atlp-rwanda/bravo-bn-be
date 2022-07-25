import db from '../database/models/index.js';
const Tripss = db['tripRequest'];
import { Op } from 'sequelize';
export const searchTrip = async (req, res) => {
  try {
    if (req.user.dataValues.role !== 'requester') {
      return res
        .status(403)
        .json({ status: 'fail', message: 'not a requester' });
    }
    let { searchTerm } = req.params;

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
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};
