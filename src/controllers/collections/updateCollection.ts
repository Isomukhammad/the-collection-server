import { Request, Response } from "express";

import { prisma } from "../../server";

export const updateCollection = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, topic, img } = req.body;

  const thingsToUpdate: {
    [key: string]: string;
  } = {
    name,
    description,
    topic,
  };

  if (img) thingsToUpdate.img = img;

  try {
    const updatedCollection = await prisma.collection.update({
      where: {
        id: Number(id),
      },
      data: {
        ...thingsToUpdate,
      },
    });

    res.status(200).json({
      status: req.__("success"),
      data: updatedCollection,
    });
  } catch (error: any) {
    res.status(500).json(error);
  }
};
