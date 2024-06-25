const BookClubMember = require('../model/BookClubMember');
const BookClub = require('../model/BookClub');

class BookClubMemberRepository {
    async addMember(bookClubId, personaId) {
        const member = await BookClubMember.create({
            book_club_id: bookClubId,
            persona_id: personaId
        });
        return member;
    }

    async removeMember(bookClubId, personaId) {
        const result = await BookClubMember.destroy({
            where: {
                book_club_id: bookClubId,
                persona_id: personaId
            }
        });
        return result > 0;
    }

    async isMember(bookClubId, personaId) {
        const member = await BookClubMember.findOne({
            where: {
                book_club_id: bookClubId,
                persona_id: personaId
            }
        });
        return !!member;
    }

    async getBookClubsByPersonaId(personaId) {
        const memberships = await BookClubMember.findAll({
            where: { persona_id: personaId },
            include: [{
                model: BookClub,
                attributes: ['id', 'name', 'description']
            }]
        });
        return memberships.map(membership => membership.BookClub);
    }
}

module.exports = new BookClubMemberRepository();