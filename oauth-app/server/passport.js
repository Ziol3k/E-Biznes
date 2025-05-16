const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const { User } = require('./models');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { Sequelize } = require('sequelize');

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
        try {
            const user = await User.findOne({
                where: {
                    [Sequelize.Op.or]: [
                        { email: profile.emails[0].value },
                        { googleId: profile.id }
                    ]
                }
            });

            if (user) {
                if (!user.googleId) {
                    user.googleId = profile.id;
                    await user.save();
                }
                return done(null, user);
            }

            const newUser = await User.create({
                email: profile.emails[0].value,
                googleId: profile.id,
            });

            done(null, newUser);
        } catch (err) {
            done(err);
        }
    }
));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/api/auth/github/callback',
    scope: ['user:email'],
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const { data: emails } = await axios.get('https://api.github.com/user/emails', {
            headers: { Authorization: `token ${accessToken}` }
        });
        const primaryEmail = emails.find(e => e.primary && e.verified) || emails[0];

        const user = await User.findOne({
            where: {
                [Sequelize.Op.or]: [
                    { email: primaryEmail?.email },
                    { githubId: profile.id }
                ]
            }
        });

        if (user) {
            if (!user.githubId) {
                user.githubId = profile.id;
                await user.save();
            }
            return done(null, user);
        }

        const newUser = await User.create({
            email: primaryEmail?.email || null,
            githubId: profile.id,
        });

        done(null, newUser);
    } catch (err) {
        done(err);
    }
}));