const express = require('express');
const { authenticationRouter } = require('./authentication');
const { invoicingRouter } = require('./invoicing');

const router = express.Router();

router.use('/auth', authenticationRouter);

router.use('/invoicing', invoicingRouter);

module.exports = router;
