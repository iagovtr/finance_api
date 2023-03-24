const md5 = require('md5');
const {
  listUserByEmailAndStatus,
  createUser,
} = require('../services/authentication-queries');
const { statusEnum } = require('../helpers/enums');
const { generateAuthToken } = require('../middlewares/authorization');

const signUp = async (request, response, nextFunction) => {
  const { name, email, password, CPF, birthDate } = request.body;

  try {
    const user = await listUserByEmailAndStatus(email, statusEnum.active);

    if (user) {
      return response.status(400).json({ error: 'user already exist' });
    }

    await createUser(name, email, md5(password), CPF, birthDate);

    response.status(201).json({ message: 'Ok' });
  } catch (error) {
    nextFunction(error);
  }
};

const signIn = async (request, response, nextFunction) => {
  const { email, password } = request.body;

  try {
    const user = await listUserByEmailAndStatus(email, statusEnum.active);

    if (!user || md5(password) !== user.senha) {
      return response
        .status(401)
        .json({ error: 'incorrect email or password' });
    }

    const token = generateAuthToken({
      userID: user.id,
      firstName: user.nome,
      email: user.email,
    });

    response.status(200).json({ auth: true, token: token });
  } catch (error) {
    nextFunction(error);
  }
};

module.exports = { signUp, signIn };
