const express = require('express');
const { authenticationRouter } = require('./authentication');
const { expenseRouter } = require('./expense');
const { verifyAuthToken } = require('../middlewares/authorization');

const router = express.Router();

router.use('/auth', authenticationRouter);

router.use('/expense', verifyAuthToken, expenseRouter);

module.exports = router;
