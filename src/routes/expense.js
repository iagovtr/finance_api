const express = require('express');
const {
  loadAllExpensesByCustomer,
  loadAllSubCategories,
} = require('../controllers/expense');

const expenseRouter = express.Router();

expenseRouter.get('/getallexpensesbycustomer', loadAllExpensesByCustomer);

expenseRouter.get('/getallsubcategories', loadAllSubCategories);

module.exports = { expenseRouter };
