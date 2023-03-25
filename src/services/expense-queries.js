const finance = require('../connections/financedb');

const getAllExpensesByCustomer = async (customerID) => {
  try {
    const expenses = await finance.query(
      `SELECT d.id, d.nome,d.preco, d.data_compra, sc.nome sub_categoria, d.observacao, d.numero_parcela, d.usuarioid, d.status, d.data_criacao, d.data_ultima_atualizacao
        FROM despesa d JOIN subcategoria sc ON d.subcategoriaid = sc.id 
        WHERE usuarioid = '${customerID}'`
    );

    return expenses[0];
  } catch {
    throw new CustomError(500, 'failed to fetch all expenses');
  }
};

const getAllSubCategories = async () => {
  try {
    const subcategories = await finance.query(`SELECT * FROM subcategoria`);

    return subcategories[0];
  } catch {
    throw new CustomError(500, 'failed to fetch all subcategories');
  }
};

const createNewExpense = async (
  expenseName,
  expenseValue,
  expenseDate,
  subCategory,
  observations,
  installments,
  customerID
) => {
  try {
    await finance.query(
      `INSERT INTO despesa (nome, preco, data_compra, subcategoriaid, observacao, numero_parcela, usuarioid, status, data_criacao)
        VALUES ('${expenseName}', ${expenseValue}, '${expenseDate}', ${subCategory}, '${observations}', '${installments}', ${customerID}, 1, GETDATE())`
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
