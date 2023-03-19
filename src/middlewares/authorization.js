const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES } = require('../config/env');

const generateAuthToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES,
  });

  return token;
};

const verifyAuthToken = (request, response, nextFunction) => {
  const token = request.headers['authorization'];
  const { isATokenValidationFromClientApp } = request.body;

  jwt.verify(token, JWT_SECRET, (error, decode) => {
    if (error) {
      return response
        .status(500)
        .json({ error: 'failed to authenticate token' });
    }

    if (isATokenValidationFromClientApp) {
      return response.status(200).json({ decode });
    }

    nextFunction();
  });
};

module.exports = {
  generateAuthToken,
  verifyAuthToken,
};
