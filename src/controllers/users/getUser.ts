import { Request, Response } from "express";
import { prisma } from "../../server";
import { validateUser } from "../../utils/validation";
import { decodeJwt } from "../../utils/decodeJwt";
import { IToken } from "../../types";

export const getUser = async (req: Request, res: Response) => {
  const token = req.token as string;

  try {
    const decoded = decodeJwt<IToken>(token);

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });
    const validationError = validateUser(user);
    if (validationError)
      return res
        .status(validationError.status)
        .json({ message: validationError.message });

    res.status(200).json({
      id: user!.id,
      username: user!.username,
      email: user!.email,
      role: user!.role,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
