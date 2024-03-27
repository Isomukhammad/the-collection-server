import { Request, Response } from "express";

import { prisma } from "../../server";

const getSqlCollection = async (id: number) => {
  return prisma.collection.findUnique({
    where: {
      id: id,
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
};

export const getCollection = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const collection = await getSqlCollection(Number(id));

    res.status(200).json({
      status: req.__("success"),
      data: collection,
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({
        message: req.__("collection-not-found"),
      });
    }
    res.status(500).json(error);
  }
};
