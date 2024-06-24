const { dbClient: Model, DataTypes } = require('../config/DataSourceConfiguration');

const Genre = Model.define('Genre', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    }
    }, 
    {
        tableName: 'genre'
    }
);

module.exports = Genre;