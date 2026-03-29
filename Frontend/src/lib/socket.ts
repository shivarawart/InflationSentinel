import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

let socket: Socket | null = null;

export const initSocket = (): Socket => {
  if (!socket) {
    socket = io(SOCKET_URL);
    socket.on('connect', () => console.log('🔌 Connected to backend'));
  }
  return socket;
};

export const getSocket = () => socket;