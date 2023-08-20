// Module importing

const express = require('express');
const mongoose = require('mongoose');
const websocket = require('ws');
const http = require('http');

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

// Setting up the websocket server

// Creating an HTTP server
const server = http.createServer(app);
const wss = new websocket.Server({server});

// WebSocket Listner
wss.on('connection', (ws) => {
    console.log('Client Connected');

    // When a message is received
    wss.on('message', (message) => {
        console.log(`Received ${message}`);
        console.log('Received: ', message);

        // Broadcast the message to all the clients
        wss.clients.forEach((client) => {
            if (wss != client && client.readyState == websocket.OPEN) {
                client.send(message);
            }
        });
    });

    // On client disconnection
    wss.on('close', () => {
        console.log('Client disconnected');
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server started on, http://localhost:${PORT}`);
});

