const Book = require('../../model/Book');
const BookRepository = require('../../repository/BookRepository');

jest.mock('../../model/Book', () => ({
  findByPk: jest.fn(),
  findOne: jest.fn()
}));

// Mock console.log and console.error
console.log = jest.fn();
console.error = jest.fn();

describe('Book Repository', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return a book when it exists', async () => {
        const mockBook = { id: 1, title: 'Test Book', toJSON: () => 'mocked book' };
        Book.findByPk.mockResolvedValue(mockBook);

        const book = await BookRepository.getBookById(1);

        expect(book).toEqual(mockBook);
        expect(Book.findByPk).toHaveBeenCalledWith(1);
    });

    test('should return null when book does not exist', async () => {
        Book.findByPk.mockResolvedValue(null);

        const book = await BookRepository.getBookById(2);

        expect(book).toBeNull();
        expect(Book.findByPk).toHaveBeenCalledWith(2);
    });

    test('should throw error when there is a database issue', async () => {
        const error = new Error('Database error');
        Book.findByPk.mockRejectedValue(error);

        await expect(BookRepository.getBookById(3)).rejects.toThrow('Database error');
        expect(Book.findByPk).toHaveBeenCalledWith(3);
    });

    test('should return the book title if found', async () => {
        const mockBook = { id: 1, title: 'Test Book', toJSON: () => 'mocked book' };
        Book.findOne.mockResolvedValue(mockBook);

        const book = await BookRepository.getBookByTitle('Test Book');

        expect(Book.findOne).toHaveBeenCalledWith({ where: { title: mockBook.title } });
        expect(book).toBe(mockBook);
    });

    test('should return undefined if the book is not found', async () => {
        Book.findOne.mockResolvedValue(null); // Simulate book not found

        const book = await BookRepository.getBookByTitle('Non-existent Book');
        expect(Book.findOne).toHaveBeenCalledWith({ where: { title: 'Non-existent Book' } });
        expect(book).toBeNull(); // Book not found
    });

    test('should throw an error if there is a database issue', async () => {
        const error = new Error('Database error');
        Book.findOne.mockRejectedValue(error);

        await expect(BookRepository.getBookByTitle('Error Book')).rejects.toThrow('Database error');
        expect(Book.findOne).toHaveBeenCalledWith({ where: { title: 'Error Book' } });
    });
});
