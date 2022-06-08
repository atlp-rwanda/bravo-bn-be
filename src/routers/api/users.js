import express from 'express';
import { login, protect, signup } from '../../controllers/authentication';
import { getUserData, updateUserProfile,getAllUsers } from '../../controllers/userController';
import { getAll, updateRole } from '../../controllers/users';
import isValidRole from '../../middlewares/isValidRole'; 
import isAdmin from '../../middlewares/isAdmin';


const userRouter = express.Router();

userRouter.get('/',getAll);
userRouter.post('/signup',signup);
userRouter.post('/login',login);
userRouter.patch('/update',protect,updateUserProfile);
userRouter.get('/',getAllUsers)
userRouter.get('/:id',protect,getUserData)
userRouter.put('/roles', isAdmin, isValidRole, updateRole);

export default userRouter
