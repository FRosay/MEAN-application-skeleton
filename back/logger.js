const winston = require('winston');

let transports = [];
if (process.env.NODE_ENV === 'test') {
  transports = [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })];
}
if (process.env.NODE_ENV === 'dev') {
  transports = [
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.File({ filename: 'error.log', level: 'error' })
  ]

}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports
});

if (process.env.NODE_ENV === 'dev') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;