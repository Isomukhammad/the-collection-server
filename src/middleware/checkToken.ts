import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) return res.status(400).json({ message: req.__("token-required") });

  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(400).json({ message: req.__("token-required") });
  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) return res.status(401).json({ message: req.__("token-expired") });
    return res.status(401).json({ message: req.__("invalid-token") });
  }
  req.token = token;

  next();
};
