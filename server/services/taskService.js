// Simulating a database with an in-memory array
let tasks = [
    { id: '1', title: 'Learn React', description: 'Study hooks and components', completed: false },
    { id: '2', title: 'Setup Node Server', description: 'Express and MVC structure', completed: true }
];

// Helper to generate unique ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// Get all tasks from the "database"
exports.getAllTasks = () => {
    return tasks;
};

// Create a new task and add it to the array
exports.createNewTask = (data) => {
    const newTask = {
        id: generateId(),
        title: data.title,
        description: data.description || '',
        completed: false
    };
    tasks.push(newTask);
    return newTask;
};

// Find task by ID and update fields
exports.updateTaskById = (id, updates) => {
    const index = tasks.findIndex(task => task.id === id);
    if (index === -1) return null;

    // Merge existing task with updates
    tasks[index] = { ...tasks[index], ...updates };
    return tasks[index];
};

// Remove task from array
exports.deleteTaskById = (id) => {
    const initialLength = tasks.length;
    tasks = tasks.filter(task => task.id !== id);
    return tasks.length < initialLength; // Returns true if item was removed
};