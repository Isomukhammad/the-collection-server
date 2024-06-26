import { NextFunction, Request, Response } from "express";

import { prisma } from "../server";
import { decodeJwt } from "../utils/decodeJwt";

export const checkItemPermission = async (req: Request, res: Response, next: NextFunction) => {
  const { id: itemId } = req.params;
  const { id: userId, role } = decodeJwt(req.token as string);

  const item = await prisma.item.findUnique({
    where: {
      id: Number(itemId),
    },
    include: {
      author: true,
    },
  });

  if (!item)
    return res.status(404).json({
      status: req.__("error"),
      message: req.__("not-found"),
    });

  if (item.authorId !== userId && role !== "ADMIN")
    return res.status(403).json({
      status: req.__("error"),
      message: req.__("no-permission"),
    });

  next();
};
