const express = require('express');
const router = express.Router();

// Import repository
const BookService = require('../service/BookService');

// Helper function to handle errors
const handleErrors = (res, error) => {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  };

// book by id
router.get("/:id", async (req, res) => {
    try {
        let book = await BookService.getBookById(req.params.id);
        res.json(book);
    } catch (error) {
        handleErrors(res, error);
    }
});

// book by title
router.get("/title/:title", async (req, res) => {
    try {
        let book = await BookService.getBookByTitle(req.params.title);
        res.json(book);
    } catch (error) {
        handleErrors(res, error);
    }
});

module.exports = router;
