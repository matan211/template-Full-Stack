const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const customEnv = require('custom-env');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = 5000;

// Load environment variables
const environment = process.env.NODE_ENV || 'default';
customEnv.env(environment, './config');

// Middleware
// Enable CORS to allow requests from React (running on a different port)
app.use(cors());
// Parse incoming JSON requests
app.use(bodyParser.json());

// Connect to MongoDB
const connectionString = process.env.CONNECTION_STRING;
if (connectionString) {
    mongoose.connect(connectionString)
        .then(() => console.log('✅ MongoDB connected'))
        .catch(err => {
            console.error('❌ MongoDB connection error:', err.message);
            console.warn('⚠️  Server will continue but database operations will fail');
        });
} else {
    console.warn('⚠️  CONNECTION_STRING not found in environment variables');
    console.warn('⚠️  Server will continue but database operations will fail');
}

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