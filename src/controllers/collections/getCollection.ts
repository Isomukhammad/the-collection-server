import { Request, Response } from "express";
import { prisma } from "../../server";

export const getCollection = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const collection = await prisma.collection.findUnique({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      status: "success",
      data: collection,
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Collection not found",
      });
    }
    res.status(500).json(error);
  }
};
