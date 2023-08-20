const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
// const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
// const bcrypt = require('bcryptjs');
const session = require('express-session');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
// const User = require('./user');

// import route handlers
const indexRouter = require('./routes/indexRouter');
const authRouter = require('./routes/authRouter');


conn = `${process.env.START_MONGODB_STRING}://${process.env.DBUSER_MONGODB}:${process.env.PASSWORD_MONGODB}${process.env.END_MONGODB_STRING}`

mongoose.connect(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('MongoDB connection open!');
    })
    .catch(err => {
        console.log('Bummer! MongoDB connection not working!');
        console.error(err)
    });

// middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());
require('./passport')(passport);


// routes
app.use('/', indexRouter);
app.use('/auth', authRouter);

// listener
app.listen(process.env.PORT, () => {
    console.log(`Server started on http://localhost:${process.env.PORT}!`)
})