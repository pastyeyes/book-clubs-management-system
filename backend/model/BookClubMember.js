const { DataTypes } = require('sequelize');
const sequelize = require('../config/DataSourceConfiguration');
const BookClub = require('./BookClub');
const Persona = require('./Persona');

const BookClubMember = sequelize.define('BookClubMember', {
  book_club_id: {
    type: DataTypes.INTEGER,
    references: {
      model: BookClub,
      key: 'id'
    },
    primaryKey: true
  },
  persona_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Persona,
      key: 'id'
    },
    primaryKey: true
  }
}, {
  tableName: 'book_club_member',
  schema: 'public'
});

BookClubMember.belongsTo(BookClub, { foreignKey: 'book_club_id' });
BookClubMember.belongsTo(Persona, { foreignKey: 'persona_id' });

module.exports = BookClubMember;
