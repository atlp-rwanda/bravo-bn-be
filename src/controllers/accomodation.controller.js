import db from '../database/models/index.js';
const accomodations = db['accomodation'];
import { fileUpload } from '../helpers/multer';
const { Op } = require('sequelize');

export const createAccomodation = async (req, res) => {
  try {
    if (req.user.dataValues.role !== 'travel admin') {
      return res
        .status(403)
        .json({ status: 'fail', message: 'not traveler admin' });
    }
    if (req.file) {
      req.body.image = await fileUpload(req);
    } else {
      req.body.image =
        'https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80';
    }
    const { name, description, locationId, image, geoLocation, highlight } =
      req.body;
    let amenitiesList = req.body.amenitiesList;

    try {
      JSON.parse(amenitiesList);
    } catch (e) {
      amenitiesList = JSON.stringify(amenitiesList);
    }

    const newAccomodation = await accomodations.create({
      name,
      description,
      locationId,
      image,
      geoLocation,
      highlight,
      amenitiesList: JSON.parse(amenitiesList),
    });
    return res.status(201).json({
      status: 'success',
      data: { newAccomodation },
      message: 'New Accomodation have been created',
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export const getAllAccomodation = async (req, res) => {
  try {
    accomodations.findAndCountAll().then((accomodations) => {
      return res
        .status(200)
        .json({ status: 'success', data: accomodations, message: 'Retrieved' });
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const updateAccomodation = async (req, res) => {
  try {
    if (req.user.dataValues.role !== 'travel admin') {
      return res
        .status(403)
        .json({ status: 'fail', message: 'not traveler admin' });
    }
    const id = req.params.id;
    if (req.file) {
      req.body.image = await fileUpload(req);
    } else {
      req.body.image =
        'https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80';
    }
    const { name, description, locationId, image, geoLocation, highlight } =
      req.body;
    let amenitiesList = req.body.amenitiesList;

    try {
      JSON.parse(amenitiesList);
    } catch (e) {
      amenitiesList = JSON.stringify(amenitiesList);
    }
    accomodations
      .update(
        {
          name,
          description,
          locationId,
          image,
          geoLocation,
          highlight,
          amenitiesList: JSON.parse(amenitiesList),
        },
        {
          where: { id: id },
        },
      )

      .then((num) => {
        if (num == 1) {
          res.send({
            message: 'Accomodation was updated successfully.',
            data: {
              name,
              description,
              locationId,
              image,
              geoLocation,
              highlight,
              amenitiesList: JSON.parse(amenitiesList),
            },
          });
        } else {
          res.send({
            message: `Cannot update accomodation with id=${id}.`,
          });
        }
      });
  } catch (err) {
    res.send(err);
  }
};

export const getSingleAccomodation = async (req, res) => {
  try {
    const id = req.params.id;

    const accomodation = await accomodations.findOne({
      where: { id },
      include: ['rooms', 'locations'],
    });

    if (!accomodation) {
      return res.status(404).json({
        status: 'fail',
        message: 'No accomodation found with that ID',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        accomodation,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'error while getting Accomodation',
    });
    console.error(err);
  }
};

export const deleteAccomodation = async (req, res) => {
  try {
    if (req.user.dataValues.role !== 'travel admin') {
      return res
        .status(403)
        .json({ status: 'fail', message: 'not traveler admin' });
    }

    const id = req.params.id;
    const accomodation = await accomodations.findOne({ where: { id } });

    if (!accomodation) {
      return res.status(404).json({
        status: 'fail',
        message: 'No acccomodation found with that ID',
      });
    }

    await accomodations.destroy({ where: { id } });

    res.status(200).json({
      status: 'success',
      message: 'accomodation deleted successfully',
    });
  } catch (err) {
    res.send(err);
  }
};
