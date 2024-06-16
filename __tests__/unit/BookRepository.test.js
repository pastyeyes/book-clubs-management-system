const Book = require('../../model/Book');
const { getBookById } = require('../../repository/BookRepository');

jest.mock('../../model/Book', () => ({
  findByPk: jest.fn(),
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

        const book = await getBookById(1);

        expect(book).toEqual(mockBook);
        expect(Book.findByPk).toHaveBeenCalledWith(1);
    });

    test('should return null when book does not exist', async () => {
        Book.findByPk.mockResolvedValue(null);

        const book = await getBookById(2);

        expect(book).toBeNull();
        expect(Book.findByPk).toHaveBeenCalledWith(2);
    });

    test('should throw error when there is a database issue', async () => {
        const error = new Error('Database error');
        Book.findByPk.mockRejectedValue(error);

        await expect(getBookById(3)).rejects.toThrow('Database error');
        expect(Book.findByPk).toHaveBeenCalledWith(3);
    });
});
