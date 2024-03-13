import { Request, Response } from "express";
import { prisma } from "../../server";
import { createHash } from "crypto";
import { validateUser } from "../../utils/validation";
import { generateToken } from "../../utils/generateToken";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log("login");
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
      status: "error",
      message: "User not found",
    });

  const saltedHash = createHash("SHA3-256")
    .update(password + process.env.PASSWORD_SALT)
    .digest("hex");

  if (user.password !== saltedHash)
    return res.status(401).json({
      status: "error",
      message: "Invalid password",
    });

  const validationError = validateUser(user);
  if (validationError)
    return res
      .status(validationError.status)
      .json({ message: validationError.message });

  const token = generateToken(user);
  res.status(200).json({
    status: "success",
    message: "User logged in successfully",
    token,
  });
};
