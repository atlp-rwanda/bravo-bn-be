import express from 'express';
import { login, protect, signup } from '../../controllers/authentication';
import { getUserData, updateUserProfile,getAllUsers } from '../../controllers/userController';
import { getAll, updateRole } from '../../controllers/users';
import isValidRole from '../../middlewares/isValidRole'; 
import isAdmin from '../../middlewares/isAdmin';
import multer from "multer";

const storage=multer.diskStorage({});
const fileFilter=(req,file,cb)=>{
    if(file.mimetype.startsWith("image"))
    {
cb(null,true);
    }
    else{
        cb("invalid image file!",false);
    }
};
const uploads=multer({storage,fileFilter});

const userRouter = express.Router();

userRouter.get('/',getAll);
userRouter.post('/signup',signup);
userRouter.post('/login',login);
userRouter.patch('/update',protect,uploads.single("image"),updateUserProfile);
userRouter.get('/',getAllUsers)
userRouter.get('/:id',protect,getUserData)
userRouter.put('/roles', isAdmin, isValidRole, updateRole);

export default userRouter
