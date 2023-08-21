const express = require('express');
const router = express.Router();
const passport = require("passport");
const User = require("../user");
const bcrypt = require("bcryptjs");

// router: GET '/auth/is-authenticated'
router.get('/is-authenticated', (req, res) => {
    console.log('[CHECK AUTH] req.isAuthenticated:', req.isAuthenticated(), ' / ', req.user);

    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'User is not authenticated.' });
    } else {
        return res.json({ message: 'User is authenticated!' });
    }
});

// router: GET '/auth/current-user'
router.get('/current-user', (req, res) => {
    console.log('[CURRENT USER] req.isAuthenticated:', req.isAuthenticated(), ' / ', req.user);
    res.send(req.user);
    // once authenticated, the user is stored in req.user!!!!!
    // the req object you get from the client now has a user object inside of it
    // and contains all the session data
    // this can be used and called at absolutely any time, anywhere in the application
})

// router: POST '/auth/login'
router.post('/login',
    passport.authenticate("local"), (req, res) => {
        console.log('User authenticated:', req.user);
        res.send('Successfully logged in!');
    });

// router: POST '/auth/register'
router.post('/register', async (req, res) => {
    console.log(req.body);
    const { email, username, password } = req.body;

    try {
        const existingUser = await User.findOne({ $or: [{ email: email }, { username: username }] });
        if (existingUser) {
            res.status(400).send('Registration Failed - email or username taken.');
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);

            // create a new user using the User model
            const newUser = new User({
                email: email,
                username: username,
                password: hashedPassword
            });

            // save the session to the database
            await newUser.save();
            res.send('User Created!');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

// router: POST '/auth/logout'
router.post('/logout', function (req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send('No user is logged in.');
    }
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


module.exports = router;