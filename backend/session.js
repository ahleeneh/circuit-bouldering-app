const mongoose = require('mongoose');

const session = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    red: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("Session", session);