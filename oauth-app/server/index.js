const express = require('express');
const session = require('express-session');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { sequelize } = require('./models');
const cors = require('cors');
require('dotenv').config();
require('./passport');

const app = express();
const authRoutes = require('./routes/auth');

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(session({
    secret: 'sessionsecret',
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({ db: sequelize }),
    cookie: {
        sameSite: 'lax',
        secure: false,
    }
}));


app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoutes);

sequelize.sync().then(() => {
    app.listen(5000, () => console.log('Server running on http://localhost:5000'));
});
