const { DataTypes } = require('sequelize');
const sequelize = require('../config/DataSourceConfiguration');
const BookClub = require('./BookClub');
const Book = require('./Book');
const Persona = require('./Persona');

const DiscussionThread = sequelize.define('DiscussionThread', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  book_club_id: {
    type: DataTypes.INTEGER,
    references: {
      model: BookClub,
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
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  author_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Persona,
      key: 'id'
    }
  }
}, {
  tableName: 'discussion_thread',
  schema: 'public'
});

DiscussionThread.belongsTo(BookClub, { foreignKey: 'book_club_id' });
DiscussionThread.belongsTo(Book, { foreignKey: 'book_id' });
DiscussionThread.belongsTo(Persona, { foreignKey: 'author_id' });

module.exports = DiscussionThread;
