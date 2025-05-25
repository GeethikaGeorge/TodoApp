// src/app.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes';
import suggestRoutes from './routes/suggestRoutes';



dotenv.config();
console.log('Auth0 Domain:', process.env.AUTH0_DOMAIN);
console.log('Auth0 Audience:', process.env.AUTH0_AUDIENCE);


const app = express();

//app.use(cors());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Example route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.use('/api/tasks', taskRoutes);
app.use('/api/suggest', suggestRoutes);
export default app;
