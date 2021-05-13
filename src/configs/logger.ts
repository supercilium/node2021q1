import winston from 'winston';
const { SPLAT } = require('triple-beam');

const MyFormat = winston.format.printf((info) => {
  const args = info[SPLAT];
  const headString = `[${info.timestamp}] - ${info.level} - ${info.message}`;
  if (args) {
    const strArgs = args?.map((arg: any) => JSON.stringify(arg)).join(' ');
    return `${headString} | ${strArgs}`;
  }
  return headString;
});

export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.metadata({ fillExcept: ['level', 'timestamp', 'message', 'service'] }),
    MyFormat,
    winston.format.colorize({ all: true }),
  ),
  transports: [
    new winston.transports.Console()
  ]
});
