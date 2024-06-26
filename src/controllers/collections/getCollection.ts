import { Request, Response } from "express";

import { getCollectionById } from "../../utils/prismaRequests";

export const getCollection = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const collection = await getCollectionById(Number(id));

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
