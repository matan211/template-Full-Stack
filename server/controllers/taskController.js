const taskService = require('../services/taskService');

// Handle fetching all tasks
exports.getTasks = async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Error fetching tasks', error: error.message });
    }
};

// Handle creating a new task
exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }
        const newTask = await taskService.createNewTask({ title, description });
        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Error creating task', error: error.message });
    }
};

// Handle updating a task
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedTask = await taskService.updateTaskById(id, updates);
        
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Error updating task', error: error.message });
    }
};

// Handle deleting a task
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await taskService.deleteTaskById(id);
        
        if (!result) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Error deleting task', error: error.message });
    }
};