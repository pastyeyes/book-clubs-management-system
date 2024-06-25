const { DataTypes } = require('sequelize');
const sequelize = require('../config/DataSourceConfiguration');
const DiscussionThread = require('./DiscussionThread');
const Persona = require('./Persona');

const DiscussionPost = sequelize.define('DiscussionPost', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  discussion_thread_id: {
    type: DataTypes.INTEGER,
    references: {
      model: DiscussionThread,
      key: 'id'
    }
  },
  persona_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Persona,
      key: 'id'
    }
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'discussion_posts',
  schema: 'public'
});

DiscussionPost.belongsTo(DiscussionThread, { foreignKey: 'discussion_thread_id' });
DiscussionPost.belongsTo(Persona, { foreignKey: 'persona_id' });

module.exports = DiscussionPost;
