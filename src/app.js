const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const { APP_PORT } = require('./config/env');
const { CustomError } = require('./helpers/error');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use('/api', routes);

app.use((error, req, res, next) => {
  if (error instanceof CustomError) {
    return res.status(error.status).json({ error: error.message });
  }

  return res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(APP_PORT, () => {
  console.log(`Server listening at PORT ${APP_PORT}`);
});
