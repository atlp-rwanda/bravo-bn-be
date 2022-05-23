import catchAsync  from '../utils/catchAsync';
import db from '../database/models/index.js';

const Notifications = db['Notifications'];

export const createNotification = catchAsync(async (userId,title, description, url ) => {
    const createdNotification = await Notifications.create({ 
        title,description,url, userId
     });

    return createdNotification;

})

export const getAllNotifications = catchAsync(async (req, res, next) => {
    const allNotifications = await Notifications.findAndCountAll({ where: { 
        userId: req.user.id
    } });

    res.status(200).json({ status: 'success', data: allNotifications });


})

export const removeNotification = catchAsync(async (req, res, next) => {
     await Notifications.destroy({ where: { 
        id: req.params.id
    } });

    res.status(204).json({ status: 'success', data: null });

});

export const removeAllNotification = catchAsync(async (req, res, next) => {
     await Notifications.destroy({ where: { 
        userId: req.user.id
    } });

    res.status(204).json({ status: 'success', data: null });

});