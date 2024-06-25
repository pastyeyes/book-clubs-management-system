const jwt = require('jsonwebtoken');

require('dotenv').config();
const basePath = process.env.API_ENDPOINT_BASE_ROUTE;
const currentVersion = process.env.API_VERSION;
const prefix = basePath.concat(currentVersion).concat('/auth');

const SECRET_KEY = process.env.SECRET_KEY_JWT;

const verifyToken = (req, res, next) => {
  // Exclude the authentication endpoints from JWT verification
  if (req.path === `${prefix}/login` || req.path === `${prefix}/register`) {
    return next();
  }

  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send({ message: 'No token provided.' });
  }

  // Verify the token
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    // Save decoded info for use in other routes
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
