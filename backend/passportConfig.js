const User = require('./user');
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
    passport.use(new localStrategy(
        async (username, password, done) => {
            try {
                const user = await User.findOne({ username: username });
                if (!user) {
                    return done(null, false);
                }

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

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            const userInformation = {
                username: user.username
            };
            done(null, userInformation);
        } catch (error) {
            done(error, null);
        }
    });

    // passport.deserializeUser(async (id, done) => {
    //     try {
    //         const user = await User.findById(id);
    //         done(null, user);
    //     } catch (error) {
    //         done(error, null);
    //     }
    // });
};
