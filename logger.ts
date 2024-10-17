import { createLogger, format, transports, Logger as WinstonLogger } from "winston";

class CustomLogger {
  private logger: WinstonLogger;

  constructor(testFileName: string) {
    const logFilePath = `logs/${testFileName}.log`;

    this.logger = createLogger({
      level: "info", // Default log level
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
      ),
      transports: [
        new transports.Console(), // Log to console
        new transports.File({
          filename: logFilePath,
          handleExceptions: true,
          options: { flags: "w" },
        }),
      ],
      exitOnError: false,
    });
  }

  // Custom log level functions
  debug(message: string) {
    this.logger.debug(message);
  }

  info(message: string) {
    this.logger.info(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  error(message: string) {
    this.logger.error(message);
  }

  critical(message: string) {
    this.logger.error(`[CRITICAL] ${message}`);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}

export default CustomLogger;
