const express = require('express');
const cors = require('cors');
const AuthRoute = require('./AuthRoute');
const BookRoute = require('./BookRoute');

const basePath = '/api';
const currentVersion = 'v1';
const prefix = `${basePath}/${currentVersion}`;

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

// create an endpoint to / that returns ok status
app.get("/", (req, res) => {
    res.status(200).json({ message: 'Api Alive' });
});

module.exports = app;