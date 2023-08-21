const express = require('express');
const router = express.Router();
const Session = require('../session');

// router: GET '/session'
router.get('/', async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            console.log('not authenticated when getting session');
            return res.status(401).json({ error: 'User is not authenticated.' });
        }

        console.log('about to get sessions associated w/ authenticated user: ', req.user);
        console.log('req.user._id: ', req.user._id);

        // fetch sessions associated with the authenticated user
        const userSessions = await Session.find({ user: req.user._id });

        console.log('userSessions: ', userSessions);
        res.json(userSessions);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching user sessions.' });
    }
});

// router: POST '/session'
router.post('/', async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            return res.status(401).json({ error: 'User is not authenticated.' });
        }

        console.log('about to create a new session!');
        const { date, red } = req.body;
        const user = req.user._id;
        console.log('user: ', user, ' / date: ', date, ' / red: ', red);

        // create a new session using the Session model
        const newSession = new Session({
            user: user,
            date: date,
            red: red
        });
        console.log('newSession: ', newSession);

        // save the session to the database
        await newSession.save();
        res.status(201).json({ message: 'Session logged successfully!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error logging session.' });
    }
})

// router: GET /session/:sessionId

// router: DELETE /session/:sessionId

module.exports = router;