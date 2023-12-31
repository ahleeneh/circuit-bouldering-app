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

// Load environment variables from .env file via 'process.env.VARIABLE_NAME' system
require('dotenv').config();

// Create the Express application
const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

// Session setup
app.use(session(sessionConfig));
app.use(cookieParser(process.env.SESSION_SECRET));

// Passport authentication setup
app.use(passport.initialize());
app.use(passport.session());
require('./passport')(passport);


/**
 * ---------- ROUTES ----------
 */

// Import route handlers
const indexRouter = require('./routes/indexRouter');
const authRouter = require('./routes/authRouter');
const sessionRouter = require('./routes/sessionRouter');

// Mount route handlers
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/session', sessionRouter);

/**
 * ---------- SERVER ----------
 */
app.listen(process.env.PORT, () => {
    console.log(`Server started on http://localhost:${process.env.PORT}!`)
})