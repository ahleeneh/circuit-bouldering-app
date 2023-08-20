const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const { sessionConfig } = require('./database');


/**
 * ---------- SETUP ----------
 */

require('dotenv').config();

// create the Express application
const app = express();

// middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

// session setup
app.use(session(sessionConfig));
app.use(cookieParser(process.env.SESSION_SECRET));

// passport authentication
app.use(passport.initialize());
app.use(passport.session());
require('./passport')(passport);


/**
 * ---------- ROUTES ----------
 */

// import route handlers
const indexRouter = require('./routes/indexRouter');
const authRouter = require('./routes/authRouter');

// mount route handlers
app.use('/', indexRouter);
app.use('/auth', authRouter);

/**
 * ---------- SERVER ----------
 */
app.listen(process.env.PORT, () => {
    console.log(`Server started on http://localhost:${process.env.PORT}!`)
})