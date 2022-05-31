import express from 'express';

const allRoutes = express.Router();

allRoutes.get('/',  (req,res) => {
    res.json({message: "Welcome to barefoot!"})
});

export default allRoutes;