const {
  createNewCard,
  createNewInvoice,
  createNewExpense,
} = require('../services/invoicing-queries');

const createCard = async (request, response, nextFunction) => {
  const { surname, cardFlag, userID } = request.body;

  try {
    await createNewCard(surname, cardFlag, userID);

    response.status(201).json({ message: 'Ok' });
  } catch (error) {
    nextFunction(error);
  }
};

const createInvoice = async (request, response, nextFunction) => {
  const { openingDate, closingDate, userID, card } = request.body;

  try {
    await createNewInvoice(openingDate, closingDate, userID, card);

    response.status(201).json({ message: 'Ok' });
  } catch (error) {
    nextFunction(error);
  }
};

module.exports = {
  createCard,
  createInvoice,
};
