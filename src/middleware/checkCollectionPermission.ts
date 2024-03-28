import { NextFunction, Request, Response } from "express";

import { prisma } from "../server";

export const checkCollectionPermission = async (req: Request, res: Response, next: NextFunction) => {
  const { id: collectionId } = req.params;
  const { id: userId, role } = req.token as any;

  const collection = await prisma.collection.findUnique({
    where: {
      id: Number(collectionId),
    },
    include: {
      author: true,
    },
  });

  if (!collection)
    return res.status(404).json({
      status: req.__("error"),
      message: req.__("collection-not-found"),
    });

  if (collection.authorId !== userId && role !== "ADMIN")
    return res.status(403).json({
      status: req.__("error"),
      message: req.__("no-permission"),
    });

  next();
};
