import express from 'express';
import { createUser, getAllUsers,loginUser } from "../services/user.service.js";
const router = express.Router();

    router.get('/', getAllUsers); 
    router.post('/create', createUser); 
    router.post('/login', loginUser);

export default router
