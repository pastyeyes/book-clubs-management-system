const { dbClient: Model, DataTypes } = require('../config/DataSourceConfiguration');

const DiscussionThread = Model.define('DiscussionThread', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    book_club_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'book_club',
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
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'persona',
        key: 'id'
      }
    }
    }, 
    {
        tableName: 'discussion_thread'
    }
);

module.exports = DiscussionThread;