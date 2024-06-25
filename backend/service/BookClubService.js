const BookClubRepository = require("../repository/BookClubRepository");

class BookClubService {

    handleError(message, error){
        console.error(message, error);
        throw error;
    }

    /* Example of a club object     
    {
        "id": 1,
        "name": "Awesome Book Club",
        "description": "A community of avid readers discussing great books."
      } 
    */

    async createBookClub(bookClubData) {
        try {
            const newBookClub = await BookClubRepository.createBookClub(bookClubData);
            console.log('New book club created:', newBookClub.toJSON());
            return newBookClub;
        } catch (error) {
            this.handleError('Error creating book club:', error);
        }
    }

    async getBookClubById(id) {
        try {
            const bookClub = await BookClubRepository.getBookClubById(id);
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
            const bookClubs = await BookClubRepository.getAllBookClubs();
            console.log('Retrieved all book clubs');
            return bookClubs;
        } catch (error) {
            this.handleError('Error retrieving all book clubs:', error);
        }
    }

}

module.exports = new BookClubService();