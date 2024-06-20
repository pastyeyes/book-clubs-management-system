const { dbClient: Model, DataTypes } = require('../config/DataSourceConfiguration');

// Define the Book model
const Book = Model.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: DataTypes.STRING,
    genre: DataTypes.STRING,
    }, 
    {
        tableName: 'book', // Specify the table name
    }
);

module.exports = Book;