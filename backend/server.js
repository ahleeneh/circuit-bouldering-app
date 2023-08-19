const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const bodyParser = require('body-parser');
const PORT = process.env.PORT;

require('dotenv').config();

const app = express();
const User = require('./user');

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
app.get('/', (req, res) => {
    res.json('hello');
})

app.post('/login', (req, res, next) => {
    console.log(req.body);

    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No User Exists");
        else {
            req.logIn(user, err => {
                if (err) throw err;
                res.send('Successfully Authenticated!!!');
                console.log(req.user);
            })
        }
    })(req, res, next);
})

app.post('/register', async (req, res) => {
    console.log(req.body);

    try {
        const existingUser = await User.findOne({username: req.body.username});
        if (existingUser) {
            res.send('User Already Exists');
        } else {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({
                email: req.body.email,
                username: req.body.username,
                password: hashedPassword
            });
            await newUser.save();
            res.send('User Created!');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

app.get('/user', (req, res) => {
    console.log(req.user);
    console.log('req.isAuthenticated: ', req.isAuthenticated());
    res.send(req.user);
    // once authenticated, the user is stored in req.user!!!!!
    // the req object you get from the client now has a user object inside of it
    // and contains all the session data
    // this can be used and called at absolutely any time, anywhere in the application
})

app.post('/logout', function (req, res, next) {
    console.log('about to log out user')

    req.logout(function (err) {
        if (err) {
            console.error('Error during logout: ', err);
            return next(err);
        }
        console.log('user has been logged out: ', req.isAuthenticated());
        res.send('Logged out successfully!');
    });
});


app.listen(process.env.PORT, () => {
    console.log(`Server started on http://localhost:${process.env.PORT}!`)
})