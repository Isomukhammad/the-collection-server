import { Request, Response, NextFunction } from "express";
import { roles } from "../config/roles";
import jwt from "jsonwebtoken";

interface User {
  role: string;
}

interface RequestWithUser extends Request {
  user: User;
}

export const checkRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const decode = jwt.verify(token, process.env.JWT_SECRET!) as User;
    if (decode.role !== role)
      return res.status(403).json({ message: "Forbidden" });
    next();
  };
};
