import { useState, useEffect } from "react";
import { fetchTask, updateTask } from "../lib/api";

interface Task {
  _id: string;
  name: string;
  elapsedTime: number;
  isRunning: boolean;
  isComplete: boolean;
  id: string;
  intervalId?: NodeJS.Timeout;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from the API
  const loadTasks = async () => {
    try {
      const tasks = await fetchTask();
      if (tasks && Array.isArray(tasks)) {
        const tasksWithId = tasks.map((task) => ({
          ...task,
          id: task._id,
        }));
        setTasks(tasksWithId);
      } else {
        console.error("Fetched tasks are not in the correct format:", tasks);
      }
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleActions = async (id: string, action: "start" | "pause" | "complete") => {
    if (!id) {
      console.error("Invalid task ID:", id);
      return;
    }

    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        if (action === "start" && !task.isRunning) {
          task.isRunning = true;
          task.intervalId = setInterval(() => {
            setTasks((prevTasks) =>
              prevTasks.map((t) =>
                t.id === id ? { ...t, elapsedTime: t.elapsedTime + 1 } : t
              )
            );
          }, 1000);
        }

        if (action === "pause" && task.isRunning) {
          task.isRunning = false;
          if (task.intervalId) {
            clearInterval(task.intervalId);
            task.intervalId = undefined;
          }
        }

        if (action === "complete") {
          task.isComplete = true;
          if (task.intervalId) {
            clearInterval(task.intervalId);
            task.intervalId = undefined;
          }
        }
      }
      return task;
    });

    setTasks(updatedTasks);

    try {
      const updatedTask = await updateTask(id, action);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, ...updatedTask } : task
        )
      );
    } catch (error) {
      console.error(`Error performing action on task:`, error);
    }
  };

  return (
    <div className="task-list bg-gray-100 min-h-screen p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 text-center">Task List</h1>
      {tasks.map((task) => (
        <div
          key={task.id}  // Unique key prop
          className={`flex items-center justify-between p-4 rounded-lg shadow-md ${
            task.isComplete ? "bg-green-200" : "bg-white"
          }`}
        >
          <div>
            <h3 className="text-lg font-medium text-gray-800">{task.name}</h3>
            <p className="text-sm text-gray-600">Elapsed Time: {task.elapsedTime}s</p>
          </div>
          <div className="flex space-x-2">
            {!task.isComplete && (
              <>
                <button
                  onClick={() =>
                    handleActions(task.id, task.isRunning ? "pause" : "start")
                  }
                  className={`px-4 py-2 rounded ${
                    task.isRunning
                      ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  {task.isRunning ? "Pause" : "Start"}
                </button>
                <button
                  onClick={() => handleActions(task.id, "complete")}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
                >
                  Complete
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
