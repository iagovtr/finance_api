const express = require('express');
const { signUp, signIn } = require('../controllers/authentication');

const authenticationRouter = express.Router();

authenticationRouter.post('/signup', signUp);

authenticationRouter.post('/signin', signIn);

module.exports = { authenticationRouter };
