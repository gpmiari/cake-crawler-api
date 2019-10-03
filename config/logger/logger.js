const winston = require('winston');
const appRoot = require('app-root-path');
const fmt = require('util').format;
const reqLogger = require('./request-logger');

const formatter = (options) => {
  let msg = fmt('%s [%s] %s', new Date().toISOString(), options.level.toUpperCase(), (options.message || ''));

  if (options.meta && Object.keys(options.meta).length) {
    msg += fmt('\n\t%s', JSON.stringify(options.meta));
  }

  return options.colorize ? winston.config.colorize(options.level, msg) : msg;
};

const options = {
  file: {
    level: 'error',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'info',
    colorize: true,
    timestamp: false,
    json: false,
    prettyPrint: true,
    formatter,
  },
};

const myLogger = (() => {
  let loggerWinston;

  const logger = () => {
    if (!loggerWinston) {
      loggerWinston = new winston.Logger({
        transports: [new winston.transports.Console(options.console)],
        exitOnError: false,
      });

      loggerWinston.stream = {
        write: (message) => {
          loggerWinston.info(message);
        },
      };
    }
    return loggerWinston;
  };

  const requestLogger = (newPattern) => {
    const loggerInstance = logger();
    const pattern = newPattern || ':method :url :reqbody - :status';

    return reqLogger(loggerInstance, pattern);
  };

  return {
    logger,
    requestLogger,
  };
})();

module.exports = myLogger;
