const Task = require('../models/task');

// Get all tasks from MongoDB
exports.getAllTasks = async () => {
    return await Task.find();
};

// Create a new task in MongoDB
exports.createNewTask = async (data) => {
    const task = new Task(data);
    return await task.save();
};

// Find task by ID and update it
exports.updateTaskById = async (id, updates) => {
    // { new: true } returns the updated document instead of the old one
    return await Task.findByIdAndUpdate(id, updates, { new: true });
};

// Delete task by ID
exports.deleteTaskById = async (id) => {
    const result = await Task.findByIdAndDelete(id);
    return result; // Returns the deleted document or null if not found
};