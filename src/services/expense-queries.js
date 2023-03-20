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

const createNewExpense = async (
  title,
  expenseValue,
  expenseDate,
  subCategory,
  userID,
  invoice,
  installments
) => {
  try {
    await finance.query(
      `INSERT INTO Expense (Title, ExpenseValue, ExpenseDate, SubCategory, UserID, Invoice, Installments)
        VALUES ('${title}', '${expenseValue}', '${expenseDate}', '${subCategory}', '${userID}', '${invoice}', '${installments}')`
    );
  } catch {
    throw new CustomError(500, 'failed to create expense');
  }
};

module.exports = {
  getAllExpensesByCustomer,
  getAllSubCategories,
  createNewExpense,
};
