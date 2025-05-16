const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('./models');
const jwt = require('jsonwebtoken');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findByPk(id);
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback',
},
    async (accessToken, refreshToken, profile, done) => {
        let user = await User.findOne({ where: { googleId: profile.id } });

        if (!user) {
            user = await User.create({
                email: profile.emails[0].value,
                googleId: profile.id,
            });
        }

        done(null, user);
    }
));
