import { NextFunction, Request, Response } from "express";

import { prisma } from "../server";
import { IToken } from "../types";
import { decodeJwt } from "../utils/decodeJwt";

type Column = "collection" | "item";

export const checkPermission = (column: Column) => {
  if (!column) throw new Error("Column is required");

  return async (req: Request, res: Response, next: NextFunction) => {
    const { id: userId, role } = decodeJwt<IToken>(req.token as string);
    const { id } = req.params;

    try {
      const collection = await (prisma[column as Column] as any).findUnique({
        where: {
          id: Number(id),
        },
        include: {
          author: true,
        },
      });

      if (!collection) return res.status(404).json({ message: req.__("not-found") });

      if (collection.author.id !== userId && role !== "ADMIN")
        return res.status(403).json({ message: req.__("no-permission") });
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
    next();
  };
};
