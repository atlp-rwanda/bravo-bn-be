import express from 'express';
import { getAll } from '../../controllers/users';
import { signup } from '../../controllers/authentication';

const userRouter = express.Router();

userRouter.get('/',getAll);
userRouter.post('/signup',signup);

export default userRouter
