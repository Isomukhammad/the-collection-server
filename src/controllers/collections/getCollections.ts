import { Request, Response } from "express";

import { prisma } from "../../server";

export const getCollections = async (req: Request, res: Response) => {
  try {
    const quantity = req.query.quantity ? Number(req.query.quantity) : undefined;
    const createdBy = req.query.createdBy === "asc" ? "asc" : "desc";

    const collections = await prisma.collection.findMany({
      where: {
        isDeleted: false,
        authorId: req.query.authorId ? Number(req.query.authorId) : undefined,
      },
      take: quantity,
      orderBy: {
        createdAt: createdBy,
      },
    });

    res.status(200).json({
      status: req.__("success"),
      data: collections,
    });
  } catch (error: any) {
    res.status(500).json(error);
  }
};
