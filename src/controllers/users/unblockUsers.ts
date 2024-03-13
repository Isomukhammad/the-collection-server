import { Request, Response } from "express";
import { prisma } from "../../server";

export const unblockUsers = async (req: Request, res: Response) => {
  const { ids } = req.body;
  try {
    let users;

    if (ids.length === 1) {
      users = await prisma.user.update({
        where: {
          id: ids[0],
        },
        data: {
          isBlocked: false,
        },
      });
    } else {
      users = await prisma.user.updateMany({
        where: {
          id: {
            in: ids,
          },
        },
        data: {
          isBlocked: false,
        },
      });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};
