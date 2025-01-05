import { createLogger, format, transports } from 'winston';

/**
 * Winston logger instance. The logger supports:
 *
 * - Logging verbosity levels: Default is "info".
 * - JSON format: Logs are formatted as JSON with timestamps for easy parsing.
 * - Transports:
 *   - Console: Logs all levels to the console.
 *   - File: Saves "error" level logs to `logs/error.log`.
 *   - File: Saves all logs to `logs/combined.log`.
 *
 * @see https://github.com/winstonjs/winston
 *
 * Example usage:
 * logger.info("Informational message");
 * logger.error("Error message with details", { error });
 */
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json(), // Logs in JSON format
  ),
  transports: [
    new transports.Console({
      silent: process.env.NODE_ENV === 'test',
    }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

export default logger;
