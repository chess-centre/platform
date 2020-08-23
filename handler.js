'use strict';

module.exports.hello = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Boom - Welcome to the Chess Centre!',
        input: event,
      },
      null,
      2
    ),
  };
};
