import express from 'express';
import { login, protect, signup } from '../../controllers/authentication';
import { getUserData, updateUserProfile,getAllUsers } from '../../controllers/userController';
import { updateRole } from '../../controllers/users';
import isValidRole from '../../middlewares/isValidRole'; 
import isAdmin from '../../middlewares/isAdmin';
import multer from "multer";
import { getAllNotifications, removeAllNotification, removeNotification } from '../../controllers/notificationController';

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

userRouter.post('/signup',signup);
userRouter.get('/notification',protect,getAllNotifications);
userRouter.delete('/notification/:id',protect,removeNotification);
userRouter.put('/notification/read',protect,removeAllNotification);
userRouter.post('/login',login);
userRouter.patch('/update',protect,uploads.single("image"),updateUserProfile);
userRouter.get('/',getAllUsers)
userRouter.get('/:id',protect,getUserData)
userRouter.put('/roles', isAdmin, isValidRole, updateRole);

export default userRouter
