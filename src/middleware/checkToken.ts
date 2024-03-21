import { NextFunction, Request, Response } from "express";

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) return res.status(400).json({ message: req.__("token-required") });

  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(400).json({ message: req.__("token-required") });
  req.token = token;

  next();
};
