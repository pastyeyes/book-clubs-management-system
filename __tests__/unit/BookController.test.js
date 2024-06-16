const { getBookById, getBookByTitle } = require('../../controller/BookController');
const BookRepository = require('../../repository/BookRepository');

jest.mock('../../repository/BookRepository', () => ({
    getBookById: jest.fn(),
    getBookByTitle: jest.fn()
}));

describe('Book Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('getBookById should return a book when it exists', async () => {
        const mockBook = { id: 1, title: 'Test Book' };
        BookRepository.getBookById.mockResolvedValue(mockBook);

        const book = await getBookById(1);

        expect(book).toEqual(mockBook);
        expect(BookRepository.getBookById).toHaveBeenCalledWith(1);
    });

    test('getBookById should throw an error when there is a problem', async () => {
        const error = new Error('Database error');
        BookRepository.getBookById.mockRejectedValue(error);
        await expect(getBookById(1)).rejects.toThrow('Database error');
        expect(BookRepository.getBookById).toHaveBeenCalledWith(1);
    });

    test('getBookByTitle should return a book when it exists', async () => {
        const mockBook = { id: 1, title: 'Test Book' };
        BookRepository.getBookByTitle.mockResolvedValue(mockBook);

        const book = await getBookByTitle('Test Book');

        expect(book).toEqual(mockBook);
        expect(BookRepository.getBookByTitle).toHaveBeenCalledWith('Test Book');
    });

    test('getBookByTitle should throw an error when there is a problem', async () => {
        const error = new Error('Database error');
        BookRepository.getBookByTitle.mockRejectedValue(error);
        await expect(getBookByTitle('Test Book')).rejects.toThrow('Database error');
        expect(BookRepository.getBookByTitle).toHaveBeenCalledWith('Test Book');
    });
});
