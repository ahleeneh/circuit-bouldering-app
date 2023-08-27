const express = require('express');
const router = express.Router();
const passport = require("passport");
const authController = require('../controllers/authController');

// ---------- GET ROUTES ----------

// router: GET '/auth/is-authenticated'
// Description: Returns a boolean symbolizing if the user is authenticated
router.get('/is-authenticated', authController.isAuthenticated);

// router: GET '/auth/current-user'
// Description: Returns the user information (once authenticated, the user is stored in req.user)
router.get('/current-user', authController.getCurrentUser);


// ---------- POST ROUTES ----------

// router: POST '/auth/login'
// Description: Logs in a user
router.post('/login', passport.authenticate("local"), authController.login);

// router: POST '/auth/register'
// Description: Registers a new user
router.post('/register', authController.register);

// router: POST '/auth/logout'
// Description: Logs out a user
router.post('/logout', authController.logout);


// ---------- PUT ROUTES ----------

// router: PUT /auth/update-password
// Description: Updates the password of a user
router.put('/update-password', authController.updatePassword);


// ---------- DELETE ROUTES ----------

// router: DELETE /auth/delete-account
// Description: Deletes a user's account
router.delete('/delete-account', authController.deleteAccount);

module.exports = router;