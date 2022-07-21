import io from '../index';
import db from '../database/models/index';
import catchAsync from '../utils/catchAsync';
const Chat = db['chat'];

export const getMessages = catchAsync(async (req, res) => {
  const messages = await Chat.findAll();

  res.status(200).json({
    status: 'success',
    data: {
      user: req.user,
      messages,
    },
  });
});

export const postMessage = catchAsync(async (req, res) => {
  let time = new Date().toGMTString();
  const post = await Chat.create({
    message: req.body.message,
    userName: req.user.username,
    date: time,
  });

  io.emit('message', post.dataValues);
  io.emit('notification', {
    message: `${req.user.username} has posted new message!`,
  });

  res.status(201).json({
    status: 'success',
  });
});
