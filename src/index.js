import http from 'http';
import 'dotenv/config';
import app from './app';

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });
server.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

io.on('connection', (socket) => {
  console.log('chat server is connected');
  //socket.broadcast.emit('notification', { message: `new message from ${req.user.username}` })
  //socket.emit('message', post.dataValues)
});

export default io;
