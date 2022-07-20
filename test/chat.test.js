import { createServer } from 'http';
import { io as Client } from 'socket.io-client';
import { Server } from 'socket.io';
import { assert, expect } from 'chai';

describe('testing chat end points', () => {
  let io, serverSocket, clientSocket;

  before((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on('connection', (socket) => {
        serverSocket = socket;
      });
      clientSocket.on('connect', done);
    });
  });

  after(() => {
    io.close();
    clientSocket.close();
  });

  let name, message;
  name = 'samuel';
  message = { message: 'Hello', userName: name, date: '2022-07-20' };

  it("should server client receive 'samuel'", (done) => {
    clientSocket.emit('user name', name);
    serverSocket.on('user name', (name) => {
      expect(name).equal('samuel');
      done();
    });
  });
  it('server should receive message from client', (done) => {
    clientSocket.emit('chat message', message);
    serverSocket.on('chat message', (message) => {
      expect(message).to.eql({
        message: 'Hello',
        userName: name,
        date: '2022-07-20',
      });
      done();
    });
  });
  it('client should receive notification from server', (done) => {
    serverSocket.emit('notification', {
      title: 'new message',
      message: `${name} has posted new message`,
    });

    clientSocket.on('notification', (notification) => {
      expect(notification).to.eql({
        title: 'new message',
        message: `${name} has posted new message`,
      });
      done();
    });
  });
});
