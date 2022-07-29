import 'dotenv/config';
import app from './app';
import socket from './utils/socket.io';

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});

socket.socketFunction.socketStarter(server);

// import http from 'http';
// import 'dotenv/config';
// import app from './app';
// import socket from './utils/socket.io';

// const PORT = process.env.PORT || 5000;
// const server = http.createServer(app);
// // const io = require('socket.io')(server, { cors: { origin: '*' } });
// server.listen(PORT, () => {
//   console.log(`App is listening on port ${PORT}`);
// });

// // io.on('connection', () => {
// //   console.log('chat server is connected');
// // });

// //export default io;
// socket.socketFunction.socketStarter(server);
