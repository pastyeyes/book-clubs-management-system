const express = require('express');
const router = express.Router();

const BookClubService = require('../service/BookClubService');

// Helper function to handle errors
const handleErrors = (res, error) => {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
};

// Create a new book club
router.post("/", async (req, res) => {
    try {
        const bookClub = await BookClubService.createBookClub(req.body);
        res.status(201).json(bookClub);
    } catch (error) {
        handleErrors(res, error);
    }
});

// Get all book clubs
router.get("/", async (req, res) => {
    try {
        const bookClubs = await BookClubService.getAllBookClubs();
        res.json(bookClubs);
    } catch (error) {
        handleErrors(res, error);
    }
});

// Get a book club by id
router.get("/:id", async (req, res) => {
    try {
        const bookClub = await BookClubService.getBookClubById(req.params.id);
        if (bookClub) {
            res.json(bookClub);
        } else {
            res.status(404).json({ error: 'Book club not found' });
        }
    } catch (error) {
        handleErrors(res, error);
    }
});


module.exports = router;