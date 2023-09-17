// const routes = require('./routes.js')
const express = require('express');

const app = express();

// routes(app)
app.get('/', (_, response) => {
  response.send('Hello aaa!');
});

app.listen(3005, () => console.log('Server running on http://localhost:3005'));
