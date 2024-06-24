const { dbClient: Model, DataTypes } = require('../config/DataSourceConfiguration');

const DiscussionPost = Model.define('DiscussionPost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    discussion_thread_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'discussion_thread',
        key: 'id'
      }
    },
    persona_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'persona',
        key: 'id'
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, 
  {
    tableName: 'discussion_posts'
  }
);

module.exports = DiscussionPost;