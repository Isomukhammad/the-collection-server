import { createHash } from "crypto";
import { Request, Response } from "express";

import { prisma } from "../../server";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const saltedHash = createHash("SHA3-256")
      .update(password + process.env.PASSWORD_SALT)
      .digest("hex");

    await prisma.user.create({
      data: {
        username,
        email,
        password: saltedHash,
      },
    });
    res.status(201).json({
      message: req.__("user-created"),
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(400).json({
        message: req.__("email-exists"),
      });
    }
    res.status(500).json(error);
  }
};
