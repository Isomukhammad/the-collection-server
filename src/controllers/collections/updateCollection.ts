import { Request, Response } from "express";
import { prisma } from "../../server";

export const updateCollection = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { name, description, topic, img } = req.body;

  try {
    const updatedCollection = prisma.collection.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        description,
        topic,
        img,
      },
    });
    res.status(200).json({
      status: "success",
      data: updatedCollection,
    });
  } catch (error: any) {
    res.status(500).json(error);
  }
};
