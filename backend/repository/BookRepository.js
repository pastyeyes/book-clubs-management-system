const Book = require('../model/Book');

class BookRepository {
    // Retrieve a book by its ID
    async getBookById(bookId) {
        const book = await Book.findByPk(bookId);
        return book;
    }
    
    // Retrieve a book by its title
    async getBookByTitle(title) {
        const book = await Book.findOne({ where: { title } });
        return book;
    }

    // Retrieve a book by its genre
    async getBookByGenre(genre) {
        const book = await Book.findOne({ where: { genre } });
        return book;
    }

}

module.exports = new BookRepository();