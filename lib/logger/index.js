const winston = require('winston');

let logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: "info",
      filename: "logs/payfast.log",
      maxFile: 10
    })
  ],
  exitOnError: false,
});

module.exports = logger;
