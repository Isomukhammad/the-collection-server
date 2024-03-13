import { NextFunction, Request, Response } from "express";
import { User } from "@prisma/client";

type Body = { [key: string]: any };

export const validateParams = (keys: string[], body: Body) => {
  for (const key of keys) {
    if (!(key in body)) {
      return `${key} is required`;
    }
  }
};

export const validateBody = (keys: string[], otherFieldsAllowed: boolean = false) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { ...otherFields } = req.body;

    keys.forEach((key) => {
      delete otherFields[key];
    });

    if (Object.keys(otherFields).length > 0 && !otherFieldsAllowed) {
      return res.status(400).json({ message: "Invalid field(s) provided" });
    }

    const error = validateParams(keys, req.body);
    if (error) return res.status(400).json({ message: error });

    next();
  };
};

export const validateUser = (user: User | null) => {
  if (!user) return { status: 404, message: "User not found" };
  if (user.isDeleted) return { status: 404, message: "User not found" };
  if (user.isBlocked) return { status: 403, message: "User is blocked" };
  return null;
};
