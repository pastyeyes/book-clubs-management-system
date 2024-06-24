const { dbClient: Model, DataTypes } = require('../config/DataSourceConfiguration');

// Define the BookClubMember model
const BookClubMember = Model.define('BookClubMember', {
    book_club_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'book_club',
        key: 'id'
      }
    },
    persona_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'persona',
        key: 'id'
      }
    }
    }, 
    {
        tableName: 'book_club_member'
    }
);

module.exports = BookClubMember;