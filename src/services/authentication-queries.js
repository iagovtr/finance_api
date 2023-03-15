const finance = require('../connections/financedb');
const { CustomError } = require('../helpers/error');

const listUserByEmailAndStatus = async (email, status) => {
  try {
    return await finance.query(
      `SELECT * FROM dbo.[User] WHERE Email = '${email}' AND Status = '${status}'`
    );
  } catch {
    throw new CustomError(500, 'failed to fetch active users');
  }
};

const createUser = async (
  firstName,
  lastName,
  email,
  password,
  CPF,
  birthDate
) => {
  try {
    return await finance.query(
      `INSERT INTO [dbo].[User] (FirstName, LastName, Email, Password, CPF, BirthDate, CreatedAt) VALUES ('${firstName}', '${lastName}', '${email}', '${password}', '${CPF}', '${birthDate}', GETDATE())`
    );
  } catch {
    throw new CustomError(500, 'failed to create user');
  }
};

module.exports = {
  listUserByEmailAndStatus,
  createUser,
};
