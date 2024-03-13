import { Request, Response } from "express";
import { prisma } from "../../server";

export const getCollections = async (req: Request, res: Response) => {
  try {
    const authorId = req.query.authorId as string | undefined;
    const quantity = req.query.quantity as string | undefined;
    const sortBy = req.query.sortBy as "asc" | "desc" | undefined;

    const collections = await prisma.collection.findMany({
      where: {
        isDeleted: false,
        authorId: authorId ? Number(authorId) : undefined,
      },
      take: quantity ? Number(quantity) : undefined,
      orderBy: {
        createdAt: sortBy || "desc",
      },
    });

    res.status(200).json({
      status: "success",
      data: collections,
    });
  } catch (error: any) {
    res.status(500).json(error);
  }
};
