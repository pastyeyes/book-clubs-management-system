const BookRepository = require("../repository/BookRepository");

class BookService {

    handleError(message, error){
        console.error(message, error);
        throw error;
    }

    async getBookById(bookId) {
        try {
            const book = await BookRepository.getBookById(bookId);
            if (book) {
                console.log('Book found:', book.toJSON());
            } else {
                console.log('Book not found');
            }
            return book;
        } catch (error) {
            this.handleError('Error retrieving book by ID:', error);
        }
    }

    async getBookByTitle(title) {
        try {
            const book = await BookRepository.getBookByTitle(title);
            if (book) {
                console.log('Book found:', book.toJSON());
            } else {
                console.log('Book not found');
            }
            return book;
        } catch (error) {
            this.handleError('Error retrieving book by title:', error);
        }
    }

    async getBookByGenre(genre) {
        try {
            const book = await BookRepository.getBookByGenre(genre);
            if (book) {
                console.log('Book found:', book.toJSON());
            } else {
                console.log('Book not found');
            }
            return book;
        } catch (error) {
            this.handleError('Error retrieving book by genre:', error);
        }
    }

}

module.exports = new BookService();