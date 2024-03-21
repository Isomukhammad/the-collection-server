import { Request, Response } from "express";

import { prisma } from "../../server";

export const getItems = async (req: Request, res: Response) => {
  const tags = req.query.tags ? (req.query.tags as string).split(",") : [];
  try {
    const items = await prisma.item.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        tags: true,
        author: {
          select: {
            username: true,
          },
        },
        fields: true,
      },
    });

    res.status(200).json({
      status: req.__("success"),
      data: items,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
