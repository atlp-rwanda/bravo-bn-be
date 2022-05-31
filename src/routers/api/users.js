import express from 'express';
// import { getAll } from '../../controllers/users';
import { login, signup } from '../../controllers/authentication';

const userRouter = express.Router();

// userRouter.get('/',getAll);
userRouter.post('/signup',signup);
userRouter.post('/login',login);

export default userRouter