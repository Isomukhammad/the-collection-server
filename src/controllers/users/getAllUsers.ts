import { Request, Response } from "express";

import { prisma } from "../../server";

export const getAllUsers = async (_: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        id: "desc",
      },
      where: {
        isDeleted: false,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        isBlocked: true,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};
