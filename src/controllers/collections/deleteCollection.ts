import { Request, Response } from "express";

import { prisma } from "../../server";

export const deleteCollection = async (req: Request, res: Response) => {
  const { ids } = req.body;

  try {
    if (ids.length === 1) {
      await prisma.collection.update({
        where: {
          id: ids[0],
        },
        data: {
          isDeleted: true,
        },
      });
    } else {
      await prisma.collection.updateMany({
        where: {
          id: {
            in: ids,
          },
        },
        data: {
          isDeleted: true,
        },
      });
    }

    res.status(200).json({
      status: req.__("success"),
      message: req.__("collection-deleted"),
    });
  } catch (error: any) {
    res.status(500).json(error);
  }
};
