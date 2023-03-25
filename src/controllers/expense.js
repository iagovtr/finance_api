const {
  getAllExpensesByCustomer,
  getAllSubCategories,
  createNewExpense,
} = require('../services/expense-queries');

const loadAllExpensesByCustomer = async (request, response, nextFunction) => {
  const { customerID } = request.query;

  if (!customerID)
    return response.status(400).json({ error: 'customerID is required' });

  try {
    const expenses = await getAllExpensesByCustomer(customerID);

    response.status(200).json({ expenses: expenses });
  } catch (error) {
    nextFunction(error);
  }
};

const loadAllSubCategories = async (request, response, nextFunction) => {
  try {
    const subcategories = await getAllSubCategories();
    response.status(200).json({ subcategories: subcategories });
  } catch (error) {
    nextFunction(error);
  }
};

const createExpense = async (request, response, nextFunction) => {
  const {
    expenseName,
    expenseValue,
    expenseDate,
    subCategory,
    observations,
    customerID,
    installments,
  } = request.body;

  try {
    await createNewExpense(
      expenseName,
      expenseValue,
      expenseDate,
      subCategory,
      observations,
      installments,
      customerID
    );

    response.status(201).json({ message: 'Ok' });
  } catch (error) {
    nextFunction(error);
  }
};

module.exports = {
  loadAllExpensesByCustomer,
  loadAllSubCategories,
  createExpense,
};
