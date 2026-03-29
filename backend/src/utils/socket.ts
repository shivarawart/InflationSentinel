import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

let io: Server;

export const initSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: { origin: '*' }
  });

  io.on('connection', (socket) => {
    console.log('🔌 Client connected:', socket.id);

    socket.on('disconnect', () => {
      console.log('❌ Client disconnected');
    });
  });

  return io;
};

export const emitPriceUpdate = (price: any) => {
  if (io) io.emit('priceUpdate', price);
};