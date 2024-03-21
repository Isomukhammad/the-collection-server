import { Request, Response } from "express";

import { prisma } from "../../server";
import { IToken } from "../../types";
import { decodeJwt } from "../../utils/decodeJwt";
import { hashPassword } from "../../utils/hashPassword";

export const editPassword = async (req: Request, res: Response) => {
  const { id } = decodeJwt<IToken>(req.token as string);
  const { current_password, new_password } = req.body;

  const hashedCurrentPassword = hashPassword(current_password);
  const newHashedPassword = hashPassword(new_password);

  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) return res.status(404).json({ message: req.__("user-not-found") });

    if (user?.password !== hashedCurrentPassword) {
      return res.status(400).json({ message: req.__("invalid-password") });
    }

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        password: newHashedPassword,
      },
    });

    res.status(200).json({
      message: req.__("password-edit-success"),
    });
  } catch (error: any) {
    res.status(500).json(error);
  }
};
