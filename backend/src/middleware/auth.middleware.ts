import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
    req.user = decoded;           // Now TypeScript knows req.user exists
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Optional: Admin only middleware (you can add later)
export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user ) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  // Add admin check logic here if you add isAdmin field later
  next();
};