const User = require('../user');
const bcrypt = require('bcryptjs');

// Check if a user is authenticated and returns a boolean value
exports.isAuthenticated = (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    res.json(isAuthenticated);
};

// Get the current user's authenticated user information
exports.getCurrentUser = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({error: 'User is not authenticated.'});
    }
    res.send(req.user);
};

// Log in a user
exports.login = async (req, res) => {
    res.send('Successfully logged in!');
};

// Register a new user
exports.register = async (req, res) => {
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
}

// Log out a user
exports.logout = async (req, res, next) => {
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
};

// Update an existing user's password
exports.updatePassword = async (req, res) => {
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
};

// Delete an existing user's account
exports.deleteAccount = async (req, res) => {
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
};