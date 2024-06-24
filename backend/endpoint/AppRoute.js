const express = require('express');
const cors = require('cors');
const AuthRoute = require('./AuthRoute');
const BookRoute = require('./BookRoute');
const BookClubRoute = require('./BookClubRoute');

require('dotenv').config();
const basePath = process.env.API_ENDPOINT_BASE_ROUTE;
const currentVersion = process.env.API_VERSION;

const prefix = basePath.concat(currentVersion);

//App
const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware for parsing JSON
app.use(express.json()); 

//Authentication api
app.use(`${prefix}/auth`, AuthRoute);
//Book api
app.use(`${prefix}/book`, BookRoute);
//Book Club api
app.use(`${prefix}/bookclub`, BookClubRoute);


// create an endpoint to / that returns ok status
app.get("/", (req, res) => {
    res.status(200).json({ message: 'Api Alive' });
});

module.exports = app;