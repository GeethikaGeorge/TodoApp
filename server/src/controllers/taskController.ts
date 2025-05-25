

// src/controllers/taskController.ts
import { Request, Response } from 'express';
import Task from '../models/Task';

let io: any;
export const setSocketServer = (socketServer: any) => {
  io = socketServer;
};

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  if (!req.auth?.sub) {
    res.status(401).json({ message: 'User not authenticated' });
    return;
  }
  try {
    const tasks = await Task.find({ userId: req.auth.sub });
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  if (!req.auth?.sub) {
    res.status(401).json({ message: 'User not authenticated' });
    return;
  }
  const { title } = req.body;
  const userId = req.auth.sub;
  try {
    const task = await Task.create({ title, userId });
    if (io) {
      io.emit('taskCreated', task);
    }
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  if (!req.auth?.sub) {
    res.status(401).json({ message: 'User not authenticated' });
    return;
  }
  const { id } = req.params;
  try {
    const updated = await Task.findOneAndUpdate(
      { _id: id, userId: req.auth.sub },
      req.body,
      { new: true }
    );
    if (!updated) {
      res.status(404).json({ message: 'Task not found or unauthorized' });
      return;
    }
    if (io) {
      io.emit('taskUpdated', updated);
    }
    res.json(updated);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  if (!req.auth?.sub) {
    res.status(401).json({ message: 'User not authenticated' });
    return;
  }
  const { id } = req.params;
  try {
    const deleted = await Task.findOneAndDelete({ _id: id, userId: req.auth.sub });
    if (!deleted) {
      res.status(404).json({ message: 'Task not found or unauthorized' });
      return;
    }
    if (io) {
      io.emit('taskDeleted', id);
    }
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
