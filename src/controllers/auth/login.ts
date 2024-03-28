import { Request, Response } from "express";

import { generateToken } from "../../utils/generateToken";
import { saltedPassword } from "../../utils/hashPassword";
import { findUserByEmail } from "../../utils/prismaRequests";
import { validateUser } from "../../utils/validation";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  if (!user)
    return res.status(404).json({
      status: req.__("error"),
      message: req.__("user-not-found"),
    });

  const saltedHash = saltedPassword(password);

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
