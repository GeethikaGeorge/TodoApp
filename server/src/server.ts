// src/server.ts
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import app from './app';
import connectDB from './config/db';
import { setSocketServer } from './controllers/taskController';
import dotenv from 'dotenv';
dotenv.config();


const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

// WebSocket Events
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

setSocketServer(io);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Auth0 Domain:', process.env.AUTH0_DOMAIN);
console.log('Auth0 Audience:', process.env.AUTH0_AUDIENCE);

  });
});
