const Persona = require('../model/Persona');

class PersonaRepository{
    async saveUser(user) {
        const newUser = await Persona.create(user);
        return newUser;
    }

    async getUserByEmail(email) {
        const user = await Persona.findOne({ where: { email } });
        return user;
    }
}

module.exports = new PersonaRepository();
