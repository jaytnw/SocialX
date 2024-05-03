// authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../configs/jwt';
import { ApiResponse } from '../models/ApiResponse';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        const response = new ApiResponse('Unauthorized', 'error');
        res.status(401).json(response);
        return;
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(jwt.decode(token));
        if (err) {
            const response = new ApiResponse('Forbidden', 'error');
            res.status(403).json(response);
            return;
        }
        next();
    });
}
