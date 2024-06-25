const Persona = require('../model/Persona');

class PersonaRepository{
    async savePersona(user) {
        const newUser = await Persona.create(user);
        return newUser;
    }

    async getPersonaByEmail(email) {
        const user = await Persona.findOne({ where: { email } });
        return user;
    }
    
    async getPersonaById(id) {
        const user = await Persona.findByPk(id);
        return user;
    }
    
}

module.exports = new PersonaRepository();
