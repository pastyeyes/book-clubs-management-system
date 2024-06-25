const request = require('supertest');
const app = require('../../endpoint/AppRoute');

describe('App', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('GET / should return HTTP 200', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);

        // Parse the response body as JSON
        const responseBody = JSON.parse(response.text);
        expect(responseBody).toStrictEqual({ message: 'Api Alive' });
    });
});
