import 'dotenv/config';
import app from './app';
import http from 'http';
import socketio from 'socket.io';

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  },
});

io.on('connect', (socket) => {
  console.log(`a user connected, socket id: ${socket.id}`);

  socket.on('test-event', () => {
    console.log('An event just occured!');
  });
});

server.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
