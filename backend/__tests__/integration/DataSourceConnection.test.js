const dbClient = require('../../config/DataSourceConfiguration');
const { Sequelize } = require('sequelize');

describe('DataSourceConnection', () => {
    test('should connect to the database', async () => {
        // The authenticate method will throw an error if the connection fails
        await expect(dbClient.authenticate()).resolves.toBeUndefined();
        await dbClient.close();
    });

    test('should fail to connect to the database with incorrect settings', async () => {
        // Create a Sequelize instance with incorrect settings
        let dbClient = new Sequelize('invalid_database', 'invalid_user', 'invalid_password', {
            host: 'localhost',
            dialect: 'postgres',
            port: 'port'
        });
        
        // Assert that the authenticate method throws an error
        await expect(dbClient.authenticate()).rejects.toThrow();
    });

});
