// Importing usermodel
const user = require('../models/userModel');

// Signup function
exports.signup = (req, res) => {
    // signup logic
    console.log('User successfully signed up!');
};

// Login function
exports.login = (req, res) => {
    //login logic
    console.log('User logged in successfully!');
};

// Exporting the functions
module.exports = {
    signup,
    login
};