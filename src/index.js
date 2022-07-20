import http from 'http';
import 'dotenv/config';
import app from './app';
// import { sendPost, getPost } from './controllers/chatController';
import wbSocket from './public/socket';

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });

server.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

wbSocket(io);
