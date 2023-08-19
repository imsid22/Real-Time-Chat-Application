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

