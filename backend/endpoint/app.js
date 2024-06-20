const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Import repository
const BookController = require('../controller/BookController');

// create an endpoint to / that returns ok status
app.get("/", (req, res) => {
    res.status(200).json({ message: 'Api Alive' });
});

// book by id
app.get("/api/book/:id", async (req, res) => {
    try {
        let book = await BookController.getBookById(req.params.id);
        res.json(book);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// book by title
app.get("/api/book/title/:title", async (req, res) => {
    try {
        let book = await BookController.getBookByTitle(req.params.title);
        res.json(book);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = app;