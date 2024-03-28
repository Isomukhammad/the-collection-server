import { Request, Response } from "express";

import { decodeJwt } from "../../utils/decodeJwt";
import { decrementItemLikes, getLikeItem, removeItemLike } from "../../utils/prismaRequests";

export const removeLike = async (req: Request, res: Response) => {
  const { id: itemId } = req.body;
  const { id: userId } = decodeJwt(req.token as string);
  if (!itemId) return res.status(400).json({ message: "Item id is required" });

  try {
    const like = await getLikeItem(userId, parseInt(itemId));
    if (!like) return res.json({ message: "Item is not liked" });

    await removeItemLike(userId, parseInt(itemId));
    await decrementItemLikes(parseInt(itemId));
    res.status(200).json({
      status: req.__("success"),
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
