const PersonaRepository = require('../repository/PersonaRepository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY_JWT;
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

async function loginUser(credentials) {
    try {
        const user = await PersonaRepository.getUserByEmail(credentials.email);
        if (!user) {
            throw new Error('User not found');
        }

        // Retrieve the stored salt for the user
        const storedSalt = user.salt;

        const passwordMatch = bcrypt.compareSync(credentials.password, user.password);
        if (!passwordMatch) {
            throw new Error('Invalid password');
        }

        //Removes the password hash for security
        user.password = '';
        user.salt = '';

        // Generate a token
        const token = jwt.sign({ id: user.id }, SECRET_KEY);
        return {
            user,
            token
        };
    } catch (error) {
        throw error;
    }
}

async function registerUser(user) {
    try {
        const existingUser = await PersonaRepository.getUserByEmail(user.email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        // Generate a new salt
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        //password comes as plain text, lets hash it with the salt
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        user.salt = salt;

        const newUser = await PersonaRepository.saveUser(user);

        if(!newUser){
            throw new Error('User not created');
        }

        //Removes the password hash and salt for security
        newUser.password = '';
        newUser.salt = '';

        // Generate a token
        const token = jwt.sign({ id: newUser.id }, SECRET_KEY);

        return {
            user: newUser,
            token
        };
    } catch (error) {
        throw error;
    }
}

module.exports = { 
    loginUser,
    registerUser
};
