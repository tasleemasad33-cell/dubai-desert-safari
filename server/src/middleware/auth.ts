import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const auth = (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decodedData: any = jwt.verify(token, process.env.JWT_SECRET as string);
    req.userId = decodedData?.id;
    req.userRole = decodedData?.role;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export const adminAuth = (req: any, res: Response, next: NextFunction) => {
  auth(req, res, () => {
    if (req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Access denied, admin only' });
    }
    next();
  });
};
