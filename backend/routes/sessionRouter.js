const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

// router: GET '/session'
// Description: Retrieves a list of sessions
router.get('/', sessionController.getSession);

// router: POST '/session'
// Description: Adds a new session
router.post('/', sessionController.addSession);

// router: PUT /session/:sessionId
// Description: Updates an existing session by sessionId
router.put('/:sessionId', sessionController.updateSession);

// router: DELETE /session/:sessionId
// Description: Deletes an existing session by sessionId
router.delete('/:sessionId', sessionController.deleteSession);

module.exports = router;