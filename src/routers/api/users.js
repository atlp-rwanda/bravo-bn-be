import express from 'express';
import { getAll, updateRole } from '../../controllers/users';
import isValidRole from '../../middlewares/isValidRole'; 
import isAdmin from '../../middlewares/isAdmin';
import { loginUser } from '../../services/user.service'

const userRouter = express.Router();

userRouter.get('/',getAll);
userRouter.post('/login', loginUser);
userRouter.put('/roles', isAdmin, isValidRole, updateRole);

export default userRouter
