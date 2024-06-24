const BookClubRepository = require("../repository/BookClubRepository");

class BookClubService {

    handleError(message, error){
        console.error(message, error);
        throw error;
    }

    async createBookClub(bookClubData) {
        try {
            const newBookClub = await BookClubRepository.create(bookClubData);
            console.log('New book club created:', newBookClub.toJSON());
            return newBookClub;
        } catch (error) {
            this.handleError('Error creating book club:', error);
        }
    }

    async getBookClubById(id) {
        try {
            const bookClub = await BookClubRepository.findById(id);
            if (bookClub) {
                console.log('Book club found:', bookClub.toJSON());
            } else {
                console.log('Book club not found');
            }
            return bookClub;
        } catch (error) {
            this.handleError('Error retrieving book club:', error);
        }
    }

    async getAllBookClubs() {
        try {
            const bookClubs = await BookClubRepository.findAll();
            console.log('Retrieved all book clubs');
            return bookClubs;
        } catch (error) {
            this.handleError('Error retrieving all book clubs:', error);
        }
    }

    async updateBookClub(id, bookClubData) {
        try {
            const updatedBookClub = await BookClubRepository.update(id, bookClubData);
            if (updatedBookClub) {
                console.log('Book club updated:', updatedBookClub.toJSON());
            } else {
                console.log('Book club not found for update');
            }
            return updatedBookClub;
        } catch (error) {
            this.handleError('Error updating book club:', error);
        }
    }

    async deleteBookClub(id) {
        try {
            const result = await BookClubRepository.delete(id);
            if (result) {
                console.log('Book club deleted:', id);
            } else {
                console.log('Book club not found for deletion');
            }
            return result;
        } catch (error) {
            this.handleError('Error deleting book club:', error);
        }
    }
}

module.exports = new BookClubService();