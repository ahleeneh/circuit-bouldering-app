const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

// router: GET '/session'
// Description:
router.get('/', sessionController.getSession);

// router: POST '/session'
router.post('/', sessionController.addSession);

// router: PUT /session/:sessionId
router.put('/:sessionId', sessionController.updateSession);

// router: DELETE /session/:sessionId
router.delete('/:sessionId', sessionController.deleteSession);

module.exports = router;