const finance = require('../connections/financedb');
const { CustomError } = require('../helpers/error');

const listUserByEmailAndStatus = async (email, status) => {
  try {
    const user = await finance.query(
      `SELECT * FROM usuario WHERE email = '${email}' AND status = ${status}`
    );

    return user[0][0];
  } catch {
    throw new CustomError(500, 'failed to fetch users');
  }
};

const createUser = async (name, email, password, CPF, birthDate) => {
  try {
    return await finance.query(
      `INSERT INTO usuario (nome, email, senha, cpf, status, data_nascimento, data_criacao)
        VALUES ('${name}', '${email}', '${password}', '${CPF}', '${birthDate}', GETDATE())`
    );
  } catch {
    throw new CustomError(500, 'failed to create user');
  }
};

module.exports = {
  listUserByEmailAndStatus,
  createUser,
};
