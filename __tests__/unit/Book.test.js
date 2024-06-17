const { dbClient: Model } = require('../../config/DataSourceConfiguration');

// Mock the DataSourceConfiguration module
jest.mock('../../config/DataSourceConfiguration', () => ({
  dbClient: {
    define: jest.fn(),
  },
  DataTypes: {
    INTEGER: 'INTEGER',
    STRING: 'STRING',
  },
}));

describe('Book model', () => {
  it('should define the Book model correctly', () => {
    const Book = require('../../model/Book');

    expect(Model.define).toHaveBeenCalledWith('Book', {
      id: {
        type: 'INTEGER',
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: 'STRING',
        allowNull: false,
      },
      author: 'STRING',
      genre: 'STRING',
    }, {
      tableName: 'book',
    });
  });
});
