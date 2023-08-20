// Importing message model
const message = require('../models/messageModel');

// Sending the message
exports.sendMessage = (req, res) => {
    // Sending the message logic

    console.log('Message has been sent');
};

// Receiving the message
exports.receiveMessage = (req, res) => {
    // Sending the message logic

    console.log('Message has been received');
};

// Exporting the functions
module.exports = {
    sendMessage,
    receiveMessage
};