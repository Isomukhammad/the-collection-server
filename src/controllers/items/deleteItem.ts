import { Request, Response } from "express";

import { prisma } from "../../server";

export const deleteItem = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.item.update({
      where: { id: Number(id) },
      data: { isDeleted: true },
    });

    res.status(200).json({
      status: req.__("item-deleted"),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
