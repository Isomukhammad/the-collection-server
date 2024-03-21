import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface User {
  role: string;
}

export const checkRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.token;
    if (!token) return res.status(401).json({ message: req.__("unauthorized") });
    const decode = jwt.verify(token, process.env.JWT_SECRET!) as User;
    if (decode.role !== role) return res.status(403).json({ message: req.__("forbidden") });
    next();
  };
};
