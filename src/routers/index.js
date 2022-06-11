import express from 'express';
import apiRouter from './api/index';
import swaggerRouter from './api/swagger.js'
import roomRouter from "./api/room.routes.js";
import accomodation from "./api/accomodation.routes.js";
import amenities from "./api/amenity.routes.js"

const allRoutes = express.Router();

allRoutes.get("/", (req,res) => {
    res.json({message: "Welcome to barefoot!"})
});

allRoutes.use('/api/v1', apiRouter);
allRoutes.use('/docs',swaggerRouter)
allRoutes.use("/api/v1/accomodation", accomodation);
allRoutes.use("/api/v1/rooms", roomRouter);
allRoutes.use("/api/v1/amenities", amenities);



export default allRoutes;
