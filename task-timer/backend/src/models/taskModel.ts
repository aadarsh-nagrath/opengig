import mongoose, { Document } from "mongoose";

interface ITask extends Document {
  name: string;
  elapsedTime: number;
  isRunning: boolean;
  isCompleted: boolean;
}

const taskSchema = new mongoose.Schema<ITask>({
  name: { type: String, required: true },
  elapsedTime: { type: Number, default: 0 },
  isRunning: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
});

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
