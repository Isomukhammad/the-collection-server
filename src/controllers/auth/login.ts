import { createHash } from "crypto";
import { Request, Response } from "express";

import { prisma } from "../../server";
import { generateToken } from "../../utils/generateToken";
import { validateUser } from "../../utils/validation";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email_isDeleted: {
        email,
        isDeleted: false,
      },
    },
  });

  if (!user)
    return res.status(404).json({
      status: req.__("error"),
      message: req.__("user-not-found"),
    });

  const saltedHash = createHash("SHA3-256")
    .update(password + process.env.PASSWORD_SALT)
    .digest("hex");

  if (user.password !== saltedHash)
    return res.status(401).json({
      status: req.__("error"),
      message: req.__("invalid-password"),
    });

  const validationError = validateUser(user);
  if (validationError) return res.status(validationError.status).json({ message: validationError.message });

  const token = generateToken(user);
  res.status(200).json({
    status: req.__("success"),
    message: req.__("logged-success"),
    token,
  });
};
