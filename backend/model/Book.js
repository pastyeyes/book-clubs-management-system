const { DataTypes } = require('sequelize');
const sequelize = require('../config/DataSourceConfiguration');

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  author: {
    type: DataTypes.STRING(255)
  },
  genre: {
    type: DataTypes.STRING(100)
  }
}, {
  tableName: 'book',
  schema: 'public'
});

module.exports = Book;
