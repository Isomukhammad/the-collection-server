import { Request, Response } from "express";

import { getSingleItem } from "../../utils/prismaRequests";

export const getItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tags = req.query.tags === "1";

  try {
    const item = await getSingleItem(parseInt(id), tags);

    if (!item) {
      return res.status(404).json({
        status: req.__("failed"),
        message: req.__("not-found"),
      });
    }

    res.status(200).json({
      status: req.__("success"),
      data: item,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
