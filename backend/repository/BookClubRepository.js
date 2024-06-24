const BookClub = require('../model/BookClub');

class BookClubRepository {
    // Retrieve a book club by its ID
    async getBookClubById(bookClubId) {
        const bookClub = await BookClub.findByPk(bookClubId);
        return bookClub;
    }

    // Retrieve a book club by its name
    async getBookClubByName(name) {
        const bookClub = await BookClub.findOne({ where: { name } });
        return bookClub;
    }

    // Create a new book club
    async createBookClub(bookClubData) {
        const newBookClub = await BookClub.create(bookClubData);
        return newBookClub;
    }

    // Update a book club
    async updateBookClub(bookClubId, bookClubData) {
        const bookClub = await BookClub.findByPk(bookClubId);
        if (!bookClub) {
            return null;
        }
        const updatedBookClub = await bookClub.update(bookClubData);
        return updatedBookClub;
    }

    // Delete a book club
    async deleteBookClub(bookClubId) {
        const bookClub = await BookClub.findByPk(bookClubId);
        if (!bookClub) {
            return false;
        }
        await bookClub.destroy();
        return true;
    }
}

module.exports = new BookClubRepository();