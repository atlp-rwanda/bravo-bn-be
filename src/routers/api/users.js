import express from 'express';
import { getAll } from '../../controllers/users';
import { login, protect, signup } from '../../controllers/authentication';
import { getUserData, updateUserProfile,getAllUsers } from '../../controllers/userController';

const userRouter = express.Router();

userRouter.get('/',getAll);
userRouter.post('/signup',signup);
userRouter.post('/login',login);
userRouter.patch('/update',protect,updateUserProfile);
userRouter.get('/',getAllUsers)
userRouter.get('/:id',protect,getUserData)

export default userRouter

