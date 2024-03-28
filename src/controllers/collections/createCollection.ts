import { Request, Response } from "express";

import { prisma } from "../../server";
import { IToken } from "../../types";
import { decodeJwt } from "../../utils/decodeJwt";
import { uploadBase64 } from "../../utils/uploadBase64";

export const createCollection = async (req: Request, res: Response) => {
  const token = req.token as string;

  try {
    const { name, description, topic, image } = req.body;

    const decoded = decodeJwt<IToken>(token);

    let imgUrl: string | null = null;

    if (image)
      await uploadBase64(image).then((url) => {
        imgUrl = url;
      });

    const newCollection = await prisma.collection.create({
      data: {
        name,
        description,
        topic,
        img: imgUrl,
        authorId: decoded.id,
      },
    });
    res.status(201).json({
      status: req.__("success"),
      message: image,
      data: newCollection,
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(400).json({
        message: req.__("collection-exists"),
      });
    }
    res.status(500).json(error);
  }
};
