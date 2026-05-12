import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        const logLine = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms\n`;
        const logDir = path.join(process.cwd(), 'logs');
        if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);
        fs.appendFile(path.join(logDir, 'access.log'), logLine, (err) => {
            if (err) console.error('Failed to write log', err);
        });
    });
    next();
}
