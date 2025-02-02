import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: () => {
        return new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", });
      },
    }),
      winston.format.printf(({timestamp, level, message}) => {
        return `[${timestamp}], ${level.toLocaleUpperCase()}: ${message}`
      })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/server.log" })
  ],
});
