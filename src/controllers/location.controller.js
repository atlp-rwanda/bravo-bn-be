import db from '../database/models/index.js';
const Location = db['Location'];

export const createLocation = async (req, res) => {
  try {
    /**
     * check if he/she is travel admin
     */
    if (req.user.dataValues.role !== 'travel admin') {
      return res.status(403).json({ message: 'not traveler admin' });
    }
    const { locationName } = req.body;

    const newLocation = await Location.create({
      locationName,
    });
    return res.status(201).json({
      status: 'success',
      data: {
        newLocation,
      },
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export const getAllLocation = async (req, res) => {
  try {
    const locationList = await Location.findAndCountAll();
    res.status(200).json({
      status: 'success',
      data: {
        locationList,
      },
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getSingleLocation = async (req, res) => {
  try {
    const id = req.params.id;
    const location = await Location.findOne({
      where: { id },
    });

    if (!location) {
      return res.status(404).json({
        status: 'success',
        message: 'No location found with that ID',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        location,
      },
    });
  } catch (err) {
    res.send(err);
  }
};

export const updateLocation = async (req, res) => {
  try {
    if (req.user.dataValues.role !== 'travel admin') {
      return res
        .status(403)
        .json({ status: 'fail', message: 'not traveler admin' });
    }
    const id = req.params.id;
    const { locationName } = req.body;
    const location = await Location.findOne({ where: { id } });

    if (!location) {
      return res.status(404).json({
        status: 'success',
        message: 'No location found with that ID',
      });
    }

    await Location.update(
      {
        locationName: locationName,
      },
      { where: { id } },
    );

    const locationData = await Location.findOne({
      where: { id },
    });

    res.status(200).json({
      status: 'success',
      message: 'Location updated successfully',
      data: {
        locationData,
      },
    });
  } catch (err) {
    res.send(err);
  }
};

export const deleteLocation = async (req, res) => {
  try {
    if (req.user.dataValues.role !== 'travel admin') {
      return res
        .status(403)
        .json({ status: 'fail', message: 'not traveler admin' });
    }
    const id = req.params.id;
    const location = await Location.findOne({ where: { id } });

    if (!location) {
      return res.status(404).json({
        status: 'fail',
        message: 'No location found with that ID',
      });
    }

    await Location.destroy({ where: { id } });

    res.status(200).json({
      status: 'success',
      message: 'Location deleted successfully',
    });
  } catch (err) {
    res.send(err);
  }
};
