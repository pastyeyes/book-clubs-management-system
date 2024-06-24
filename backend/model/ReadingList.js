const { dbClient: Model, DataTypes } = require('../config/DataSourceConfiguration');

const ReadingList = Model.define('ReadingList', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    persona_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'persona',
        key: 'id'
      }
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'book',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, 
  {
    tableName: 'reading_list'
  }
);

module.exports = ReadingList;