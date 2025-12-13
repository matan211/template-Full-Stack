const mongoose = require('mongoose');

// Define the schema for a Task/Item
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true // Validation: Title must exist
    },
    description: {
        type: String,
        default: '' // Default value if not provided
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true // Adds 'createdAt' and 'updatedAt' fields automatically
});

module.exports = mongoose.model('Task', taskSchema);