import http from 'http';
import 'dotenv/config';
import app from './app';
import { sendPost, getPost } from './controllers/chatController';

import db from './database/models/index';
const Chat = db['chat'];

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });

server.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

const users = {};
let posts = [];
io.on('connection', (socket) => {
  socket.on('new-user', (name) => {
    users[socket.id] = name;
    socket.broadcast.emit('user-connected', name);
  });

  socket.on('send-chat-message', () => {
    try {
      Chat.findAll({ where: {} }).then((post) => {
        post.forEach((element) => {
          posts.push(element.dataValues);
        });
        return posts;
      });
    } catch (err) {
      console.log(err);
    }
    console.log(posts);
  });

  //socket.emit('add-post', posts)
  socket.on('add-message', (message) => {
    const post = { userName: users[socket.id], message: message };
    try {
      Chat.create(post);
    } catch (err) {
      console.log(err);
    }
    //socket.broadcast.emit('chat-message', post);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id]);
    delete users[socket.id];
  });
});
