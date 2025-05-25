//server/src/routes/suggestRoutes.ts
import express from 'express';
import { suggestTasks } from '../controllers/suggestController';

const router = express.Router();

router.post('/', suggestTasks); // POST /api/suggest

export default router;
