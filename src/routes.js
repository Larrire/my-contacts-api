const routes = (app) => {
  app.get('/', (request, response) => {
    response.send('Hello world!');
  });
};

export default routes;
