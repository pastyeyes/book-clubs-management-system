const BookClub = require('../model/BookClub');

class BookClubRepository {
    // Retrieve a book club by its ID
    async getBookClubById(bookClubId) {
        const bookClub = await BookClub.findByPk(bookClubId);
        return bookClub;
    }

    async getAllBookClubs() {
        const bookClubs = await BookClub.findAll();
        return bookClubs;
    }

    // Create a new book club
    async createBookClub(bookClubData) {
        const newBookClub = await BookClub.create(bookClubData);
        return newBookClub;
    }

}

module.exports = new BookClubRepository();