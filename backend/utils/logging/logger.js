const winston = require("winston");
const { createLogger, format, transports } = winston;
const { combine, timestamp, printf, errors, json, prettyPrint } = format;

const env = process.env.NODE_ENV || "dev";

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    logFormat,
    json(),
    prettyPrint()
  ),
  transports: [
    // new transports.Console(format.colorize(), format.simple()),
    new transports.File({ filename: `logs/${env}/app.log` }),
    new transports.File({ filename: `logs/${env}/error.log`, level: "error" }),
  ],
});

const DailyRotateFile = require("winston-daily-rotate-file");
logger.add(
  new DailyRotateFile({
    filename: `logs/${env}/app-%DATE%.log`,
    datePattern: "YYYY-MM-DD",
    maxFiles: false,
  })
);

module.exports = logger;
