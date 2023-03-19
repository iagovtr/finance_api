const md5 = require('md5');
const {
  listUserByEmailAndStatus,
  createUser,
} = require('../services/authentication-queries');
const { statusEnum } = require('../helpers/enums');
const { generateAuthToken } = require('../middlewares/authorization');

const signUp = async (request, response, nextFunction) => {
  const { firstName, lastName, email, password, CPF, birthDate } = request.body;

  try {
    const activeUserByEmail = await listUserByEmailAndStatus(
      email,
      statusEnum.active
    );

    if (activeUserByEmail[0][0]) {
      return response.status(400).json({ error: 'user already exist' });
    }

    await createUser(firstName, lastName, email, md5(password), CPF, birthDate);

    response.status(201).json({ message: 'Ok' });
  } catch (error) {
    nextFunction(error);
  }
};

const signIn = async (request, response, nextFunction) => {
  const { email, password } = request.body;

  try {
    const activeUserByEmail = await listUserByEmailAndStatus(
      email,
      statusEnum.active
    );

    if (
      !activeUserByEmail[0][0] ||
      md5(password) !== activeUserByEmail[0][0].Password
    ) {
      return response
        .status(401)
        .json({ error: 'incorrect email or password' });
    }

    const token = generateAuthToken({
      userID: activeUserByEmail[0][0].UserID,
      firstName: activeUserByEmail[0][0].FirstName,
      email: activeUserByEmail[0][0].Email,
    });

    response.status(200).json({ auth: true, token });
  } catch (error) {
    nextFunction(error);
  }
};

module.exports = { signUp, signIn };
