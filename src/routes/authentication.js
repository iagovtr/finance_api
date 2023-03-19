const express = require('express');
const { signUp, signIn } = require('../controllers/authentication');
const { verifyAuthToken } = require('../middlewares/authorization');

const authenticationRouter = express.Router();

authenticationRouter.post('/signup', signUp);

authenticationRouter.post('/signin', signIn);

authenticationRouter.post('/checkToken', verifyAuthToken);

module.exports = { authenticationRouter };
