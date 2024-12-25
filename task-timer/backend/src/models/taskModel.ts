import mongoose, { Schema, Document } from 'mongoose';

interface Task extends Document {
  name: string;
  elapsedTime: number;
  isRunning: boolean;
  isComplete: boolean;
}

const taskSchema = new Schema<Task>({
  name: { type: String, required: true },
  elapsedTime: { type: Number, default: 0 },
  isRunning: { type: Boolean, default: false },
  isComplete: { type: Boolean, default: false },
});

const Task = mongoose.model<Task>('Task', taskSchema);

export default Task;
