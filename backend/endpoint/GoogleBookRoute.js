const express = require('express');
const router = express.Router();

// Import repository
const BookService = require('../service/GoogleBooksService');

// Helper function to handle errors
const handleErrors = (res, error) => {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  };

// book by author
router.get("/author/:author", async (req, res) => {
    try {
        let book = await BookService.getBooksByAuthor(req.params.author);
        res.json(book);
    } catch (error) {
        handleErrors(res, error);
    }
});

// book by title
router.get("/title/:title", async (req, res) => {
    try {
        let book = await BookService.getBooksByTitle(req.params.title);
        res.json(book);
    } catch (error) {
        handleErrors(res, error);
    }
});

// book by genre
router.get("/genre/:genre", async (req, res) => {
    try {
        let book = await BookService.getBooksByGenre(req.params.genre);
        res.json(book);
    } catch (error) {
        handleErrors(res, error);
    }
});

module.exports = router;
