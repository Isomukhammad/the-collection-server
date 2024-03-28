import { Request, Response } from "express";

import { prisma } from "../../server";
import { decodeJwt } from "../../utils/decodeJwt";

export const updateCollection = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, topic, img } = req.body;
  const user = decodeJwt(req.token as string);

  try {
    const updatedCollection = await prisma.collection.update({
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
      status: req.__("success"),
      data: updatedCollection,
    });
  } catch (error: any) {
    res.status(500).json(error);
  }
};
