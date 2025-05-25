//src/models/Task.ts

import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userId: { type: String,
   // mongoose.Schema.Types.ObjectId,
     ref: 'User' ,required: true},
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);
