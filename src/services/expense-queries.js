const finance = require('../connections/financedb');

const getAllExpensesByCustomer = async () => {
  try {
    const expenses = await finance.query(
      `SELECT 
        e.ExpenseID, e.UserID, e.Title, sc.SubCategory, e.ExpenseValue, e.ExpenseDate, c.Surname, e.Installments 
      FROM Expense e
      JOIN SubCategory sc ON e.SubCategory = sc.SubCategoryID
      JOIN Invoice i ON i.InvoiceID = e.Invoice
      JOIN Card c ON c.CardID = i.Card`
    );

    return expenses[0];
  } catch {
    throw new CustomError(500, 'failed to fetch all expenses');
  }
};

const getAllSubCategories = async () => {
  try {
    const subcategories = await finance.query(`SELECT * FROM SubCategory`);

    return subcategories[0];
  } catch {
    throw new CustomError(500, 'failed to fetch all subcategories');
  }
};

module.exports = {
  getAllExpensesByCustomer,
  getAllSubCategories,
};
