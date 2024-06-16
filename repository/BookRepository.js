const Book = require('../model/Book');

// Retrieve a book by its ID
async function getBookById(bookId) {
    try {
        const book = await Book.findByPk(bookId);
        if (book) {
            console.log('Book found:', book.toJSON());
        } else {
            console.log('Book not found');
        }
        return book;
    } catch (error) {
        console.error('Error retrieving book:', error);
    }
}
  
// Retrieve a book by its title
async function getBookByTitle(title) {
    try {
        const book = await Book.findOne({ where: { title } });
        if (book) {
        console.log('Book found:', book.toJSON());
        } else {
        console.log('Book not found');
        }
        return book.title;
    } catch (error) {
        console.error('Error retrieving book:', error);
    }
}
  
  // Export functions for use in other parts of the application
module.exports = {
    getBookById,
    getBookByTitle
};