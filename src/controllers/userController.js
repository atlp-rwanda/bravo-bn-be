import jsonwebtoken  from 'jsonwebtoken';
import catchAsync  from '../utils/catchAsync';
import AppError  from '../utils/appError';
import db from '../database/models/index.js';
import {signupAuthSchema} from '../helpers/validation_schema'

const User = db['users']

export const getAllUsers=catchAsync(async (req,res,next)=>{
    try{
        let users = await User.findAll({attributes: {exclude: 
     ['password','createdAt','updatedAt', 'passwordChangedAt',
        'passwordResetExpires',
        'passwordResetToken',
       ' socialMediaId']}});
        return res.status(200).json({
            status:true,
            data:users,
            message:"Retrieved"});
    }
    catch(error){
        return res.status(500).json(error.message);
    }
});

export const getUserData=catchAsync(async (req,res,next)=>{
    try{
        let user = await User.findOne({attributes: {exclude: 
     ['password','createdAt','updatedAt', 'passwordChangedAt',
        'passwordResetExpires',
        'passwordResetToken',
       ' socialMediaId']},where:{id:req.params.id}});
       if(!user){
           return next(new AppError('User not found',404));
       }
        return res.status(200).json({
            status:true,
            data:user,
            message:"Retrieved"});
    }
    catch(error){
        return res.status(500).json(error.message);
    }
});

export const updateUserProfile = catchAsync(async (req, res, next) => {
    const user = await User.findByPk(req.user.dataValues.id);
if(!user){
    return next(new AppError('User not found', 404));
}
if(user.id!=req.params.id){
    return next(new AppError('You are not authorized to update this user', 401));
}
const {firstName,lastName,email,phoneNumber,image,provider,gender,preferredLanguage,preferredCurrency,department,lineManager,role} = req.body;
const updatedUser=  await User.update({
    firstName,lastName,email,phoneNumber,image,provider,gender,preferredLanguage,preferredCurrency,department,lineManager,role
},{
    where:{id:user.id}
})
if(updatedUser)
res.status(200).json({message:"user Profile updated well done"})
});





