"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const taskSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    elapsedTime: { type: Number, default: 0 },
    isRunning: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
});
const Task = mongoose_1.default.model("Task", taskSchema);
exports.default = Task;
