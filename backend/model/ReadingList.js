const { DataTypes } = require('sequelize');
const sequelize = require('../config/DataSourceConfiguration');
const Persona = require('./Persona');
const Book = require('./Book');

const ReadingList = sequelize.define('ReadingList', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  persona_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Persona,
      key: 'id'
    }
  },
  book_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Book,
      key: 'id'
    }
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'reading_list',
  schema: 'public'
});

ReadingList.belongsTo(Persona, { foreignKey: 'persona_id' });
ReadingList.belongsTo(Book, { foreignKey: 'book_id' });

module.exports = ReadingList;
