const express = require('express');
const cors = require('cors');
const AuthRoute = require('./AuthRoute');
const GoogleBookRoute = require('./GoogleBookRoute');
const BookClubRoute = require('./BookClubRoute');
const BookClubMember = require('./BookClubMemberRoute');

require('dotenv').config();
const basePath = process.env.API_ENDPOINT_BASE_ROUTE;
const currentVersion = process.env.API_VERSION;
const prefix = basePath.concat(currentVersion);

const verifyToken = require('../config/TokenVerification');

//App
const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware for parsing JSON
app.use(express.json()); 

// Apply the JWT verification middleware
app.use(verifyToken);

//Authentication api
app.use(`${prefix}/auth`, AuthRoute);
//Book api
app.use(`${prefix}/google-book`, GoogleBookRoute);
//Book Club api
app.use(`${prefix}/book-club`, BookClubRoute);
app.use(`${prefix}/book-club-member`, BookClubMember);

// create an endpoint to / that returns ok status
app.get("/", (req, res) => {
    res.status(200).json({ message: 'Api Alive' });
});

module.exports = app;