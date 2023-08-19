// Module importing

const express = require('express');
const mongoose = require('mongoose');
const websocket = require('ws');

// Initialize the express application
const app = express();
const PORT = 3000;

// Specifying how to handle the requests (Test route)
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Initializing the server to listen for requests
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});

// Setting up the database connection (MongoDB)

mongoose.connect('mongodb://localhost:27017/chatapp', {
    newUseUrlParser: true,
    useUnifiedTopology: true
});

// Handling the connection events
const db = mongoose.connection
// In case of an error
db.on('error', console.error.bind(console, 'connection error:'));
// When connection is successful
db.once('open', function() {
    console.log('Connection to MongoDB successful');
});

// Generate a schema for the database
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

// Setting up the message schema
const messageSchema = new mongoose.Schema({
    content: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    createdAt: {type: Date, default: Date.now}
});

// Create models for the schemas
const User = mongoose.model('User', userSchema);
const Message = mongoose.model('Message', messageSchema);
