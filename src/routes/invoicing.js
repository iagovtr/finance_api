const express = require('express');
const { createCard, createInvoice } = require('../controllers/invoicing');

const invoicingRouter = express.Router();

invoicingRouter.post('/createcard', createCard);

invoicingRouter.post('/createinvoice', createInvoice);

module.exports = { invoicingRouter };
