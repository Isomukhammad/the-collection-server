import { NextFunction, Request, Response } from "express";

import { IToken } from "../types";
import { decodeJwt } from "../utils/decodeJwt";

export const checkIUserEditPermission = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { id: userId, role } = decodeJwt<IToken>(req.token as string);
    const { id } = req.body as { id: number };

    if (role !== "ADMIN" && userId !== id) {
      return res.status(403).json({ message: req.__("no-permission") });
    }
    console.log("User has permission to edit");
    next();
  };
};
