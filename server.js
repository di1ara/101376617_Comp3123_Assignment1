const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
require('dotenv').config();
const employeeRoute = require('./routes/empRoutes'); 
const userRoute = require('./routes/userRoutes'); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Make sure to include this to parse JSON request bodies
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/emp", employeeRoute);

// Serve the login and signup pages
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Assignment 1</h1>");
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
