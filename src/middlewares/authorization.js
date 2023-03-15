const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES } = require('../config/env');

const generateAuthToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES,
  });

  return token;
};

const verifyAuthToken = (request, response, nextFunction) => {
  const token = request.headers['Authorization'];

  if (!token) {
    return response.status(400).json({ error: 'no token provided' });
  }

  jwt.verify(token, JWT_SECRET, (error, decode) => {
    if (error) {
      return response
        .status(500)
        .json({ error: 'failed to authenticate token' });
    }
    request['tokenData'] = decode;
    nextFunction();
  });
};

module.exports = {
  generateAuthToken,
  verifyAuthToken,
};
