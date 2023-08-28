const User = require('./user');
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
    // Configure passport to use local strategy for authentication
    passport.use(new localStrategy(
        async (username, password, done) => {
            try {
                // Find a user with the provided username
                const user = await User.findOne({ username: username });
                if (!user) {
                    return done(null, false);
                }

                // Compare the provided password with the user's hashed password
                const passwordsMatch = await bcrypt.compare(password, user.password);
                if (passwordsMatch) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (error) {
                return done(error);
            }
        }
    ));

    // Serialize user for session storage
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Deserialize user from session storage
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);

            if (!user) {
                return done(null, false);
            }

            const userInformation = {
                _id: user._id,
                username: user.username
            };
            done(null, userInformation);
        } catch (error) {
            done(error, null);
        }
    });
};
