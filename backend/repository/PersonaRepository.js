const Persona = require('../model/Persona');

async function saveUser(user) {
    try {
        const newUser = await Persona.create(user);
        return newUser;
    } catch (error) {
        console.error('Error saving user:', error);
        throw error;
    }
}

async function getUserByEmail(email) {
    try {
        const user = await Persona.findOne({ where: { email } });
        return user;
    } catch (error) {
        console.error('Error retrieving user:', error);
        throw error;
    }
}

module.exports = {
    saveUser,
    getUserByEmail
};
