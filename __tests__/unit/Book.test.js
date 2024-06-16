const { DbClient: Model, DataTypes } = require('../../config/OrmConfig');

// Mock the OrmConfig module
jest.mock('../../config/OrmConfig', () => ({
  DbClient: {
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
