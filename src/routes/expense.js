const express = require('express');
const {
  loadAllExpensesByCustomer,
  loadAllSubCategories,
  createExpense,
} = require('../controllers/expense');

const expenseRouter = express.Router();

expenseRouter.get('/getallexpensesbycustomer', loadAllExpensesByCustomer);

expenseRouter.get('/getallsubcategories', loadAllSubCategories);

expenseRouter.post('/createexpense', createExpense);

module.exports = { expenseRouter };
