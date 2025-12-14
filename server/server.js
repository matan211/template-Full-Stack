// Express is a web framework for Node.js for building APIs
const express = require('express');
// Mechanism to allow requests from React (running on a different port)
const cors = require('cors');
// Parse incoming JSON requests
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// Load environment variables
const customEnv = require('custom-env');
const carRoutes = require('./routes/carRoutes');

const app = express();
const PORT = 5000;

// Load environment variables
const environment = process.env.NODE_ENV || 'default';
customEnv.env(environment, './config');


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
        });
}

// Routes
app.use('/api/cars', carRoutes);


// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});