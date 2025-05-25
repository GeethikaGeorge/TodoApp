//src/routes/taskRoutes.ts
import express, { Request, Response } from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController';
import checkJwt from '../middleware/checkAuth';
const router = express.Router();

router.use(checkJwt); // Protect all routes with JWT authentication
// Define routes
router.get('/', getTasks); // GET /api/tasks
router.post('/', createTask); // POST /api/tasks
router.patch('/:id', updateTask); // PATCH /api/tasks/:id
router.delete('/:id', deleteTask); // DELETE /api/tasks/:id

export default router;
