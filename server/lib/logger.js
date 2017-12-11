import { createLogger, format, transports } from 'winston';
import config from './config';

const logger = createLogger({
  level: 'info',
});

if (config.environment !== 'PROD') {
  logger.add(new transports.Console({
    format: format.combine(
      format.splat(),
      format.simple(),
    ),
  }));
}

export default logger;
