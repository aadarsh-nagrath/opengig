import { Request, Response } from "express";
import express from "express";
import Task from "../models/taskModel";

// Fetch all tasks
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
}; 

// Add a new task
export const addTask = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newTask = new Task({ name });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { action } = req.body;

  try {
    const task = await Task.findById(id);
    if (task) {
      if (action === "start") {
        task.isRunning = true;
        task.isComplete = false;
      }
      if (action === "pause") {
        task.isRunning = false;
      }
      if (action === "complete") {
        task.isComplete = true;
        task.isRunning = false;
      }
      await task.save();
      res.json(task);  // Send the updated task back
    } else {
      res.status(404).send("Task not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
  
