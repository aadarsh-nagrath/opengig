"use client";

import React, { useState } from "react";
import { addTask } from "../lib/api";

interface TaskFormProps {
  onTaskAdded: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskAdded }) => {
  const [taskName, setTaskName] = useState("");

  const handleAddTask = async () => {
    if (taskName.trim()) {
      try {
        await addTask(taskName);
        setTaskName("");
        onTaskAdded();
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  return (
    <div className="task-form bg-white shadow-lg rounded-lg p-6 max-w-sm mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Add a New Task
      </h2>
      <input
        type="text"
        placeholder="Enter task name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleAddTask}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskForm;
