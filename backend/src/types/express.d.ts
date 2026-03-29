// src/types/express.d.ts
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        id:IUser
        // You can add more fields later if needed
      } | JwtPayload;
    }
  }
}

export {}; // This makes the file a module so declaration merging works