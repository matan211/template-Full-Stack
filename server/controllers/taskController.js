const taskService = require('../services/taskService');

// Handle fetching all tasks
exports.getTasks = (req, res) => {
    try {
        const tasks = taskService.getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
};

// Handle creating a new task
exports.createTask = (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }
        const newTask = taskService.createNewTask({ title, description });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error });
    }
};

// Handle updating a task
exports.updateTask = (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedTask = taskService.updateTaskById(id, updates);
        
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
    }
};

// Handle deleting a task
exports.deleteTask = (req, res) => {
    try {
        const { id } = req.params;
        const isDeleted = taskService.deleteTaskById(id);
        
        if (!isDeleted) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
};