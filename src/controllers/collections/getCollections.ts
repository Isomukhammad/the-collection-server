import { Request, Response } from "express";

import { prisma } from "../../server";

const getDbCollections = async (
  authorId: number | undefined,
  quantity: number | undefined,
  createdBy: "asc" | "desc",
  isBiggest: boolean,
) => {
  if (isBiggest) {
    return prisma.collection.findMany({
      where: {
        isDeleted: false,
        authorId: authorId ? authorId : undefined,
      },
      take: quantity,
      orderBy: {
        items: {
          _count: "desc",
        },
      },
      include: {
        items: true,
      },
    });
  }

  return prisma.collection.findMany({
    where: {
      isDeleted: false,
      authorId: authorId ? authorId : undefined,
    },
    take: quantity,
    orderBy: {
      createdAt: createdBy,
    },
  });
};

export const getCollections = async (req: Request, res: Response) => {
  try {
    const authorId = req.query.author_id ? Number(req.query.author_id) : undefined;
    const quantity = req.query.quantity ? Number(req.query.quantity) : undefined;
    const createdBy = req.query.created_by === "asc" ? "asc" : "desc";
    const isBiggest = req.query.is_biggest === "1";
    let user = null;

    if (authorId) {
      user = await prisma.user.findUnique({
        where: {
          id: authorId,
        },
        select: {
          username: true,
        },
      });
    }

    const collections = await getDbCollections(authorId, quantity, createdBy, isBiggest);

    if (authorId && user) {
      return res.status(200).json({
        status: req.__("success"),
        author: user.username,
        data: collections,
      });
    }

    res.status(200).json({
      status: req.__("success"),
      data: collections,
    });
  } catch (error: any) {
    res.status(500).json(error);
  }
};
