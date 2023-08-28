const mongoose = require('mongoose');

// Define Session schema
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
    yellow: {
        type: Number,
        default: 0
    },
    red: {
        type: Number,
        default: 0
    },
    green: {
        type: Number,
        default: 0
    },
    purple: {
        type: Number,
        default: 0
    },
    orange: {
        type: Number,
        default: 0
    },
    black: {
        type: Number,
        default: 0
    },
    blue: {
        type: Number,
        default: 0
    },
    pink: {
        type: Number,
        default: 0
    },
    white: {
        type: Number,
        default: 0
    }
})

// Middleware: pre-save hook
session.pre('save', function (next) {
    if (this.isNew) {
        // Set color fields to 0 if they are null
        this.yellow = this.yellow || 0;
        this.red = this.red || 0;
        this.green = this.green || 0;
        this.purple = this.purple || 0;
        this.orange = this.orange || 0;
        this.black = this.black || 0;
        this.blue = this.blue || 0;
        this.pink = this.pink || 0;
        this.white = this.white || 0;
        next();
    } else {
        next();
    }
});

// Export the Session model
module.exports = mongoose.model("Session", session);