import { basename } from 'path';
import { createLogger, transports, format } from "winston";
import { Config } from './config/Config';
import winston = require('winston');

export const logger: winston.Logger = createLogger({
  exitOnError: true,
  level: Config.getInstance().getLogLevel()
}
);

const demoFormat = format.printf((info) => {
  if (info.stack != undefined) {
    return `${info.timestamp} ${info.level} ${info.message} : ${info.stack}`;
  }
  return `${info.timestamp} ${info.level} : ${info.message}`;
});

logger.add(new transports.Console({
  format: format.combine(
    //format.label({ label: basename(process.mainModule.filename) }),
    format.colorize(),
    format.splat(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    demoFormat
  ),
  handleExceptions: true
})
);