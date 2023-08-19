const mongoose = require('mongoose');


const user = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
    // username: String,
    // password: String
});

module.exports = mongoose.model("User", user);