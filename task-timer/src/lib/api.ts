// Required endpoints:
// POST /tasks: Add a new task.
// GET /tasks: Fetch the list of tasks.
// PUT /tasks/{id}: Update task status (e.g., start/pause timer, mark as completed).

import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchTask = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const addTask = async (name: string) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, { name });
    return response.data;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

//0 num and action 
export const updateTask = async (id: string, action: 'start' | 'pause' | 'complete') => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${id}`, 
        { action }
      );
      return response.data;  
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;  
    }
  };
