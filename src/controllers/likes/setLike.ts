import { Request, Response } from "express";

import { decodeJwt } from "../../utils/decodeJwt";
import { getLikeItem, incrementItemLikes, setItemLike } from "../../utils/prismaRequests";

export const setLike = async (req: Request, res: Response) => {
  const { id: itemId } = req.body;
  const { id: userId } = decodeJwt(req.token as string);
  if (!itemId) return res.status(400).json({ message: "Item id is required" });

  try {
    const like = await getLikeItem(userId, parseInt(itemId));
    if (like) return res.json({ message: "Item is already likes" });

    await setItemLike(userId, parseInt(itemId));
    await incrementItemLikes(parseInt(itemId));

    res.status(200).json({
      status: req.__("success"),
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
