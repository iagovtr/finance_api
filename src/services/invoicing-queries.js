const finance = require('../connections/financedb');
const { CustomError } = require('../helpers/error');

const createNewCard = async (surname, cardFlag, userID) => {
  try {
    await finance.query(
      `INSERT INTO Card (Surname, CardFlag, UserID) 
        VALUES ('${surname}', '${cardFlag}', '${userID}')`
    );
  } catch {
    throw new CustomError(500, 'failed to create card');
  }
};

const createNewInvoice = async (openingDate, closingDate, userID, card) => {
  try {
    await finance.query(
      `INSERT INTO Invoice (OpeningDate, ClosingDate, UserID, Card) 
        VALUES ('${openingDate}', '${closingDate}', '${userID}', '${card}')`
    );
  } catch {
    throw new CustomError(500, 'failed to create invoice');
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
  createNewCard,
  createNewInvoice,
  createNewExpense,
};