import { Request, Response } from "express";

import { decodeJwt } from "../../utils/decodeJwt";
import { getLikedItems } from "../../utils/prismaRequests";

export const getUserLikes = async (req: Request, res: Response): Promise<void> => {
  const { id } = decodeJwt(req.token as string);

  try {
    const likes = await getLikedItems(id);
    const likedItems = likes.map((like) => like.item);
    res.status(200).json({
      status: req.__("success"),
      data: likedItems,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
