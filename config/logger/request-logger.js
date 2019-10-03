const morgan = require('morgan');

morgan.token('reqbody', (req) => JSON.stringify(req.body));

const skip = (req, res) => res.statusCode < 400;

const requestLogger = (logger, pattern = ':method :url :reqbody - :status') => {
  const definition = {
    stream: {
      write: logger.info,
    },
    skip,
  };

  return morgan('combined', { pattern, definition });
};

module.exports = requestLogger;
