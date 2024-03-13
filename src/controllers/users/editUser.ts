import { Request, Response } from "express";
import { User } from "@prisma/client";

import { decodeJwt } from "../../utils/decodeJwt";
import { hashPassword } from "../../utils/hashPassword";
import { prisma } from "../../server";
import { IToken } from "../../types";

export const editUser = async (req: Request, res: Response) => {
  const token = req.token as string;
  const { username, email, password, role, isBlocked } = req.body as User;

  try {
    const decoded = decodeJwt<IToken>(token);

    const columnsToUpdate: Partial<User> = {
      username,
      role,
      isBlocked,
    };

    if (email) {
      columnsToUpdate.email = email;
    }

    if (password) {
      const hashedPassword = hashPassword(password);
      columnsToUpdate.password = hashedPassword;
    }

    await prisma.user.update({
      where: {
        id: decoded.id,
      },
      data: columnsToUpdate,
    });

    res.status(200).json({
      message: "Profile updated successfully",
    });
  } catch (error: any) {
    if (error.code === "P2002")
      return res.status(400).json({ message: "Email already exists" });
    res.status(500).json(error);
  }
};
