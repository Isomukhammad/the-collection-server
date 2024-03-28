import { Request, Response } from "express";

import { prisma } from "../../server";
import { deleteColelctionById, deleteItemsByCollectionId } from "../../utils/prismaRequests";

export const deleteCollection = async (req: Request, res: Response) => {
  const { id: collectionId } = req.params;

  try {
    await deleteColelctionById(Number(collectionId));
    await deleteItemsByCollectionId(Number(collectionId));

    res.status(200).json({
      status: req.__("success"),
      message: req.__("collection-deleted"),
    });
  } catch (error: any) {
    res.status(500).json(error);
  }
};
