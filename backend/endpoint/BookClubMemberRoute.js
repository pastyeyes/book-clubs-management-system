const express = require('express');
const router = express.Router();
const BookClubMemberService = require('../service/BookClubMemberService');

// Join a book club
router.post('/join', async (req, res) => {
    try {
        const { bookClubId, personaId } = req.body;
        const result = await BookClubMemberService.joinBookClub(bookClubId, personaId);
        res.status(201).json({ message: 'Successfully joined the book club', result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Leave a book club
router.post('/leave', async (req, res) => {
    try {
        const { bookClubId, personaId } = req.body;
        const result = await BookClubMemberService.leaveBookClub(bookClubId, personaId);
        if (result) {
            res.status(200).json({ message: 'Successfully left the book club' });
        } else {
            res.status(404).json({ message: 'Membership not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all book clubs a persona belongs to
router.get('/persona/:personaId', async (req, res) => {
    try {
        const { personaId } = req.params;
        const bookClubs = await BookClubMemberService.getBookClubsForPersona(parseInt(personaId));
        res.status(200).json(bookClubs);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;