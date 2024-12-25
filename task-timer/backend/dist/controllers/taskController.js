"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.addTask = exports.getTasks = void 0;
const taskModel_1 = __importDefault(require("../models/taskModel"));
// Fetch all tasks
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield taskModel_1.default.find();
        res.json(tasks);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getTasks = getTasks;
// Add a new task
const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const newTask = new taskModel_1.default({ name });
        yield newTask.save();
        res.status(201).json(newTask);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.addTask = addTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { action } = req.body;
        const task = yield taskModel_1.default.findById(id);
        if (task) {
            if (action === "start")
                task.isRunning = true;
            if (action === "pause")
                task.isRunning = false;
            if (action === "complete")
                task.isCompleted = true;
            yield task.save();
            res.json(task);
        }
        else {
            res.status(404).send("Task not found");
        }
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.updateTask = updateTask;
