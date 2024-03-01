import { NextFunction, Request, Response } from "express";

type Body = { [key: string]: any };

export const validateParams = (keys: string[], body: Body) => {
  for (const key of keys) {
    if (!(key in body)) {
      return `${key} is required`;
    }
  }
};

export const validateBody = (keys: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { ...otherFields } = req.body;

    keys.forEach((key) => {
      delete otherFields[key];
    });

    if (Object.keys(otherFields).length > 0) {
      return res.status(400).json({ error: "Invalid field(s) provided" });
    }

    const error = validateParams(keys, req.body);
    if (error) return res.status(400).json({ error });

    next();
  };
};
