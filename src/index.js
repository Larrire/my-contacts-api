const express = require('express');
require('express-async-errors');

const routes = require('./routes');
const { errorHandler } = require('./middlewares');

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(3005, () => console.log('Server running on http://localhost:3005'));
