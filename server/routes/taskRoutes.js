const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Define routes and map them to controller functions

// GET all tasks
router.get('/', taskController.getTasks);

// POST create a new task
router.post('/', taskController.createTask);

// PUT update a task by ID
router.put('/:id', taskController.updateTask);

// DELETE remove a task by ID
router.delete('/:id', taskController.deleteTask);

module.exports = router;