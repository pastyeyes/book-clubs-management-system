const PersonaRepository = require('../repository/PersonaRepository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY_JWT;
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

class AuthService {

    async loginUser(credentials) {
        try {
            const user = await PersonaRepository.getUserByEmail(credentials.email);
            if (!user) {
                throw new Error('User not found');
            }

            const passwordMatch = bcrypt.compareSync(credentials.password, user.password);
            if (!passwordMatch) {
                throw new Error('Invalid password');
            }

            return {
                user: this.sanitizeUser(user),
                token: jwt.sign({ id: user.id }, SECRET_KEY)
            };
        } catch (error) {
            this.handleError('Error logging in:', error);
        }
    }

    async registerUser(user) {
        try {
            const existingUser = await PersonaRepository.getUserByEmail(user.email);
            if (existingUser) {
                throw new Error('User already exists');
            }

            // Generate a new salt
            const salt = await bcrypt.genSalt(SALT_ROUNDS);

            //password comes as plain text, lets hash it with the salt
            user.password = await bcrypt.hash(user.password, salt);

            const newUser = await PersonaRepository.saveUser(user);

            if(!newUser){
                throw new Error('User not created');
            }

            return {
                user: this.sanitizeUser(newUser),
                token: jwt.sign({ id: newUser.id }, SECRET_KEY)
            };
        } catch (error) {
            this.handleError('Error logging in:', error);
        }
    }

    sanitizeUser(user) {
        //Removes the password hash and salt for security
        user.password = '';
        user.salt = '';
        return user;
    }

    handleError(message, error){
        console.error(message, error);
        throw error;
    }
}

module.exports = new AuthService();