const express = require('express');
const router = express.Router();
const Session = require('../session');

// router: GET '/session'
// Description:
router.get('/', async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            return res.status(401).json({error: 'User is not authenticated.'});
        }

        // fetch sessions associated with the authenticated user
        const userSessions = await Session.find({user: req.user._id}).sort({date: -1});
        console.log('userSessions: ', userSessions);
        res.json(userSessions);

    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error fetching user sessions.'});
    }
});

// router: POST '/session'
router.post('/', async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            return res.status(401).json({error: 'User is not authenticated.'});
        }

        const {date, ...colors} = req.body;
        const user = req.user._id;

        // create a new session using the Session model
        const newSession = new Session({
            user,
            date,
            ...colors
        });

        // save the session to the database
        await newSession.save();
        res.status(201).json({message: 'Session logged successfully!'});

    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error logging session.'});
    }
})


// router: GET '/session/date'
// Description: Fetch sessions based on a specific date
// router.get('/date', async (req, res) => {
//     try {
//         if (!req.isAuthenticated()) {
//             return res.status(401).json({ error: 'User is not authenticated.' });
//         }
//
//         // Retrieve the date query parameter from the request
//         const dateParam = req.query.date;
//
//         // Construct the start and end of the specified date
//         const startDate = new Date(dateParam);
//         const endDate = new Date(startDate);
//         endDate.setDate(endDate.getDate() + 1); // Add one day to get the end of the day
//
//         // Fetch sessions associated with the authenticated user for the specified date
//         const userSessions = await Session.find({
//             user: req.user._id,
//             date: { $gte: startDate, $lt: endDate }
//         }).sort({ date: 1 });
//
//         console.log('userSessions: ', userSessions);
//         res.json(userSessions);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Error fetching user sessions.' });
//     }
// });


// router: GET /session/:sessionId

// router: DELETE /session/:sessionId

module.exports = router;