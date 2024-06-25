const { DataTypes } = require('sequelize');
const sequelize = require('../config/DataSourceConfiguration');

const BookClub = sequelize.define('BookClub', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'book_club',
  schema: 'public'
});

BookClub.associate = function(models) {
  BookClub.belongsToMany(models.Persona, { through: models.BookClubMember, foreignKey: 'book_club_id' });
};

module.exports = BookClub;
