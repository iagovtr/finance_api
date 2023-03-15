const express = require('express');
const {
  createCard,
  createInvoice,
  createExpense,
} = require('../controllers/invoicing');

const invoicingRouter = express.Router();

invoicingRouter.post('/createcard', createCard);

invoicingRouter.post('/createinvoice', createInvoice);

invoicingRouter.post('/createexpense', createExpense);

module.exports = { invoicingRouter };
