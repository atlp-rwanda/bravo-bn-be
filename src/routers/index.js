import express from 'express';
import apiRouter from './api/index';
import roomRouter from './api/room.routes.js';
import accomodation from './api/accomodation.routes.js';
import locationRouter from './api/location.routes.js';
import searchRouter from './api/search.routes.js';
import feedbackRouter from './api/feedback.routes.js';

const allRoutes = express.Router();

allRoutes.get('/', (req, res) => {
  res.json({ message: 'Welcome to barefoot!' });
});

allRoutes.use('/api/v1', apiRouter);
allRoutes.use('/api/v1/accomodation', accomodation);
allRoutes.use('/api/v1/rooms', roomRouter);
allRoutes.use('/api/v1/location', locationRouter);
allRoutes.use('/api/v1/search', searchRouter);
allRoutes.use('/api/v1/feedback', feedbackRouter);

export default allRoutes;
