const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { User } = require('../models');

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({ email, password: hash });
        res.json({ message: 'User created', user: { id: user.id, email: user.email } });
    } catch {
        res.status(400).json({ message: 'Email already used' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({ token });
});

router.get('/me', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(payload.id);
        res.json({ email: user.email });
    } catch {
        res.sendStatus(401);
    }
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'consent'
}));

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
}), (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET);
    const encodedToken = encodeURIComponent(token);
    res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${encodedToken}`);
});

router.get('/github', passport.authenticate('github', {
    scope: ['user:email'],
    prompt: 'consent'
}));

router.get('/github/callback', passport.authenticate('github', {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
}), (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET);
    const encodedToken = encodeURIComponent(token);
    res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${encodedToken}`);
});

module.exports = router;
