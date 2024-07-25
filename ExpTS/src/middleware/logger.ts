import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const LOGS_DIR = process.env.LOGS_DIR || 'logs';

// Verifique se o diretório de logs existe, se não, crie-o
if (!fs.existsSync(LOGS_DIR)) {
  fs.mkdirSync(LOGS_DIR, { recursive: true });
}

function logger(type: "combined" | "short") {
  return (req: Request, res: Response, next: NextFunction) => {
    const logFilePath = path.join(LOGS_DIR, 'access.log');
    const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

    const now = new Date().toISOString();
    let logEntry: string;

    if (type === "combined") {
      logEntry = `${now} ${req.method} ${req.url} ${req.httpVersion} ${req.get('User-Agent')}`;
    } else {
      logEntry = `${now} ${req.method} ${req.url}`;
    }

    logStream.write(logEntry + '\n');
    logStream.end();

    next();
  };
}

export default logger;
