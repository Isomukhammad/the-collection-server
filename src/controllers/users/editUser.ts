import { User } from "@prisma/client";
import { Request, Response } from "express";

import { prisma } from "../../server";
import { hashPassword } from "../../utils/hashPassword";

export const editUser = async (req: Request, res: Response) => {
  const { id, username, email, password, role, isBlocked = false } = req.body as User;

  try {
    const columnsToUpdate: Partial<User> = {
      username,
      role,
      isBlocked,
    };
    if (email) columnsToUpdate.email = email;
    if (password) columnsToUpdate.password = hashPassword(password);

    await prisma.user.update({
      where: {
        id,
      },
      data: columnsToUpdate,
    });

    res.status(200).json({
      message: req.__("user-updated"),
    });
  } catch (error: any) {
    if (error.code === "P2002") return res.status(400).json({ message: req.__("email-exists") });
    res.status(500).json(error);
  }
};
