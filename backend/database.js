const mongoose = require('mongoose');
require('dotenv').config();

const conn = `${process.env.START_MONGODB_STRING}://${process.env.DBUSER_MONGODB}:${process.env.PASSWORD_MONGODB}${process.env.END_MONGODB_STRING}`

mongoose.connect(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('MongoDB connection open!');
    })
    .catch(error => {
        console.log('Bummer! MongoDB connection not working! ', error);
    })

const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}

module.exports = { sessionConfig };