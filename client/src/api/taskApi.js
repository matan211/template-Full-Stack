import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

// Fetch all tasks
export const fetchTasks = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Create a new task
export const addTask = async (taskData) => {
    const response = await axios.post(API_URL, taskData);
    return response.data;
};

// Toggle task completion (example update)
export const updateTask = async (id, updates) => {
    const response = await axios.put(`${API_URL}/${id}`, updates);
    return response.data;
};

// Delete a task
export const deleteTask = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};