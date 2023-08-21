const express = require('express');
const router = express.Router();
const passport = require("passport");
const User = require("../user");
const bcrypt = require("bcryptjs");

// router: GET '/auth/is-authenticated'
// Description: Returns a boolean symbolizing if the user is authenticated
router.get('/is-authenticated', (req, res) => {
    console.log('[Is-Authenticated]: ', req.isAuthenticated(), ' / [user]: ', req.user);
    const isAuthenticated = req.isAuthenticated();
    res.json(isAuthenticated);
});


// router: GET '/auth/current-user'
// Description: Returns the user information (once authenticated, the user is stored in req.user)
router.get('/current-user', (req, res) => {
    console.log('[Current-User]', req.isAuthenticated(), ' / [user]: ', req.user);
    res.send(req.user);
})

// router: POST '/auth/login'
// Description: Logs in a user
router.post('/login',
    passport.authenticate("local"), (req, res) => {
        console.log('[Login]: ', req.user);
        res.send('Successfully logged in!');
    });

// router: POST '/auth/register'
// Description: Registers a new user
router.post('/register', async (req, res) => {
    console.log('[Register]: ', req.body);
    const {email, username, password} = req.body;

    try {
        const existingUser = await User.findOne({$or: [{email: email}, {username: username}]});

        if (existingUser) {
            return res.status(400).send('Registration Failed - email or username taken.');
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user using the User model
        const newUser = new User({
            email: email,
            username: username,
            password: hashedPassword
        });

        // Save the session to the database
        await newUser.save();
        res.send('User Created!');

    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
})

// router: POST '/auth/logout'
// Description: Logs out a user
router.post('/logout', function (req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send('No user is logged in.');
    }

    req.logout(function (error) {
        if (error) {
            console.error('Error during logout: ', error);
            return next(error);
        }

        console.log('user has been logged out: ', req.isAuthenticated());
        res.status(200).send('Logged out successfully!');
    });
});


module.exports = router;