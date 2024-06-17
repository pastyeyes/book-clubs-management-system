const express = require('express');
const app = express();

// Import repository
const BookController = require('./controller/BookController');

app.get("/", async (req, res) => {
    try {
        let book = await BookController.getBookById(1);
        let title = await BookController.getBookByTitle('Sci-fi');
        res.send(`Hello World! Book: ${book.genre} Title: ${title}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = app;