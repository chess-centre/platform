'use strict';

module.exports.welcome = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Welcome to Sheffield Chess Centre!',
        input: event,
      },
      null,
      2
    ),
  };
};
