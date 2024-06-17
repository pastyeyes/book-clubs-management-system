const request = require('supertest');
const app = require('../../app');
const BookController = require('../../controller/BookController');

jest.mock('../../controller/BookController', () => ({
    getBookById: jest.fn(),
    getBookByTitle: jest.fn()
}));

// Mock console.log and console.error
console.log = jest.fn();
console.error = jest.fn();

describe('App', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('GET / should return greeting with book information', async () => {
        const mockBook = { id: 1, title: 'Test Book', genre: 'Test Genre' };
        BookController.getBookById.mockResolvedValue(mockBook);
        BookController.getBookByTitle.mockResolvedValue(mockBook);

        const response = await request(app).get('/');

        expect(response.status).toBe(200);
        expect(response.text).toContain('Hello World!');
        expect(response.text).toContain(`Book: ${mockBook.genre}`);
        expect(response.text).toContain(`Title: ${mockBook.title}`);
    });

    test('GET / should handle errors', async () => {
        const error = new Error('Database error');
        BookController.getBookById.mockRejectedValue(error);
        BookController.getBookByTitle.mockRejectedValue(error);

        const response = await request(app).get('/');

        expect(response.status).toBe(500);
        expect(response.text).toContain('Internal Server Error');
    });
});
