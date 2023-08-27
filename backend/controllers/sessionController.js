const Session = require('../session');

exports.getSession = async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            return res.status(401).json({error: 'User is not authenticated.'});
        }

        // fetch sessions associated with the authenticated user
        const userSessions = await Session.find({
            user: req.user._id}).sort({date: -1}
        );

        console.log('userSessions: ', userSessions);
        res.json(userSessions);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error fetching user sessions.'});
    }
};

exports.addSession = async (req, res) => {
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
};

exports.updateSession = async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            return res.status(401).json({ error: 'User is not authenticated.' });
        }

        const sessionId = req.params.sessionId;
        const updateData = req.body;

        const updatedSession = await Session.findByIdAndUpdate(
            sessionId,
            updateData,
            { new: true }
        );

        if (!updatedSession) {
            return res.status(404).json({ error: 'Session not found or you do not have permission.' });
        }
        res.status(200).json({ message: 'Session updated successfully!', updatedSession });

    } catch (error) {
        res.status(500).json({ error: 'Error updating session.' });
    }
};

exports.deleteSession = async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            return res.status(401).json({ error: 'User is not authenticated.' });
        }

        const session = await Session.findOneAndDelete({
            _id: req.params.sessionId,
            user: req.user._id
        });

        if (!session) {
            return res.status(404).json({ error: 'Session not found or you do not have permission.' });
        }
        res.status(200).json({ message: 'Session deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting session.' });
    }
};