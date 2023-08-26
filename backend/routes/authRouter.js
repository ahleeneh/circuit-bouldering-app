const express = require('express');
const router = express.Router();
const passport = require("passport");
const User = require("../user");
const bcrypt = require("bcryptjs");

// ---------- GET ROUTES ----------

// router: GET '/auth/is-authenticated'
// Description: Returns a boolean symbolizing if the user is authenticated
router.get('/is-authenticated', (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    res.json(isAuthenticated);
});

// router: GET '/auth/require-auth'
// Description: Returns an error if the user is not authenticated
router.get('/require-auth', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({error: 'User is not authenticated.'});
    }
    res.status(200).json({message: 'User is authenticated.'});
})

// router: GET '/auth/current-user'
// Description: Returns the user information (once authenticated, the user is stored in req.user)
router.get('/current-user', (req, res) => {
    res.send(req.user);
})


// ---------- POST ROUTES ----------

// router: POST '/auth/login'
// Description: Logs in a user
router.post('/login', passport.authenticate("local"), (req, res) => {
    res.send('Successfully logged in!');
});

// router: POST '/auth/register'
// Description: Registers a new user
router.post('/register', async (req, res) => {
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


// ---------- PUT ROUTES ----------

// router: PUT /auth/update-password
// Description: Updates the password of a user
router.put('/update-password', async (req, res) => {
    const userId = req.user._id;
    const {oldPassword, newPassword} = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found.'});
        }

        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({message: 'Old password is invalid.'});
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.json({message: 'Password changed successfully', user});
    } catch (error) {
        console.error(error);
    }
});


// ---------- DELETE ROUTES ----------

// router: DELETE /auth/delete-account
// Description: Deletes a user's account
router.delete('/delete-account', async (req, res) => {
    console.log(req.user);
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found.'});
        }
        console.log('user: ', user);
        await user.deleteOne();
        res.json({message: 'Account successfully deleted.' });
    } catch (error) {
        console.error(error);
    }

})

module.exports = router;