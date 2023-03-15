const express = require('express');
const { authenticationRouter } = require('./authentication');
const { invoicingRouter } = require('./invoicing');
const { verifyAuthToken } = require('../middlewares/authorization');

const router = express.Router();

router.use('/auth', authenticationRouter);

router.use('/invoicing', verifyAuthToken, invoicingRouter);

module.exports = router;
