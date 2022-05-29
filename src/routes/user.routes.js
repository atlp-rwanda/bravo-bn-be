import express from 'express';
import { createUser, getAllUsers, updateRole } from "../services/user.service.js";

const router = express.Router();

    router.get('/', getAllUsers); 
    router.post('/create', createUser); 
    router.put('/roles', updateRole);

export default router
