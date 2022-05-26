import express from 'express';
import { getAll } from '../../controllers/users';

const userRouter = express.Router();

userRouter.get('/',getAll);
export default userRouter
