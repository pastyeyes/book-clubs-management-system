const BookClubMemberRepository = require('../repository/BookClubMemberRepository');
const BookClubRepository = require('../repository/BookClubRepository');
const PersonaRepository = require('../repository/PersonaRepository');

class BookClubMemberService {
    async joinBookClub(bookClubId, personaId) {
        try {
            const bookClub = await BookClubRepository.getBookClubById(bookClubId);
            if (!bookClub) {
                throw new Error('Book club not found');
            }

            const persona = await PersonaRepository.getPersonaById(personaId);
            if (!persona) {
                throw new Error('Persona not found');
            }

            const isMember = await BookClubMemberRepository.isMember(bookClubId, personaId);
            if (isMember) {
                throw new Error('Persona is already a member of this book club');
            }

            const member = await BookClubMemberRepository.addMember(bookClubId, personaId);
            console.log(`Persona ${personaId} joined book club ${bookClubId}`);
            return member;
        } catch (error) {
            console.error('Error joining book club:', error);
            throw error;
        }
    }

    async leaveBookClub(bookClubId, personaId) {
        try {
            const isMember = await BookClubMemberRepository.isMember(bookClubId, personaId);
            if (!isMember) {
                throw new Error('Persona is not a member of this book club');
            }

            const result = await BookClubMemberRepository.removeMember(bookClubId, personaId);
            if (result) {
                console.log(`Persona ${personaId} left book club ${bookClubId}`);
            }
            return result;
        } catch (error) {
            console.error('Error leaving book club:', error);
            throw error;
        }
    }

    async getBookClubsForPersona(personaId) {
        try {
            const persona = await PersonaRepository.getPersonaById(personaId);
            if (!persona) {
                throw new Error('Persona not found');
            }

            const bookClubs = await BookClubMemberRepository.getBookClubsByPersonaId(personaId);
            console.log(`Retrieved ${bookClubs.length} book clubs for persona ${personaId}`);
            return bookClubs;
        } catch (error) {
            console.error('Error retrieving book clubs for persona:', error);
            throw error;
        }
    }

    
}

module.exports = new BookClubMemberService();