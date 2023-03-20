const {
  getAllExpensesByCustomer,
  getAllSubCategories,
  createNewExpense,
} = require('../services/expense-queries');

const loadAllExpensesByCustomer = async (request, response, nextFunction) => {
  try {
    const expenses = await getAllExpensesByCustomer();

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
    title,
    expenseValue,
    expenseDate,
    subCategory,
    userID,
    invoice,
    installments,
  } = request.body;

  try {
    await createNewExpense(
      title,
      expenseValue,
      expenseDate,
      subCategory,
      userID,
      invoice,
      installments
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
