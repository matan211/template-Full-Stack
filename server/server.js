const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = 5000;

// Middleware
// Enable CORS to allow requests from React (running on a different port)
app.use(cors());
// Parse incoming JSON requests
app.use(bodyParser.json());

// Routes
// Mount the task routes under /api/tasks
app.use('/api/tasks', taskRoutes);

// Health Check
app.get('/', (req, res) => {
    res.send('Server is up and running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});