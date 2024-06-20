const express = require('express');
const router = express.Router();

// Import repository
const BookController = require('../controller/BookController');

// book by id
router.get("/:id", async (req, res) => {
    try {
        let book = await BookController.getBookById(req.params.id);
        res.json(book);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// book by title
router.get("/title/:title", async (req, res) => {
    try {
        let book = await BookController.getBookByTitle(req.params.title);
        res.json(book);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
