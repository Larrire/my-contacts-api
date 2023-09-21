const middlewares = {
  errorHandler: (error, _, response, next) => {
    console.log('##### Error handler');
    console.log(error);
    response.sendStatus(500);
  },
};

module.exports = middlewares;
