const BookRepository = require("../repository/BookRepository");

async function getBookById(bookId) {
  try {
    const book = await BookRepository.getBookById(bookId);
    return book;
  } catch (error) {
    throw error;
  }
}

async function getBookByTitle(title) {
  try {
    const book = await BookRepository.getBookByTitle(title);
    return book;
  } catch (error) {
    throw error;
  }
}

module.exports = { 
    getBookById, 
    getBookByTitle 
};



