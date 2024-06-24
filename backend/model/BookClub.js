const { dbClient: Model, DataTypes } = require('../config/DataSourceConfiguration');

// Define the BookClub model
const BookClub = Model.define('BookClub', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: DataTypes.TEXT
    }, 
    {
        tableName: 'book_club'
    }
);

module.exports = BookClub;