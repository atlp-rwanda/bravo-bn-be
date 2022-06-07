import express from 'express';
import { login, protect, signup } from '../../controllers/authentication';
import { getUserData, updateUserProfile,getAllUsers } from '../../controllers/userController';
import { getAll, updateRole } from '../../controllers/users';
import isValidRole from '../../middlewares/isValidRole'; 
import isAdmin from '../../middlewares/isAdmin';
import { loginUser } from '../../services/user.service'

const userRouter = express.Router();

userRouter.get('/',getAll);
userRouter.post('/signup',signup);
userRouter.post('/login',login);
userRouter.put('/roles', isAdmin, isValidRole, updateRole);

export default userRouter
