import { Request, Response } from "express";
import { prisma } from "../server";
import jwt from "jsonwebtoken";
import { createHash } from "node:crypto";
import { validateUser } from "../utils/validation";

const generateToken = (user: { id: number; email: string; role: string }) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
    },
  );
};

class AuthController {
  async registerUser(req: Request, res: Response) {
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
        message: "User created successfully",
      });
    } catch (error: any) {
      if (error.code === "P2002") {
        return res.status(400).json({
          message: "Email already in use",
        });
      }
      res.status(500).json(error);
    }
  }

  async loginUser(req: Request, res: Response) {
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
  }
}

export default new AuthController();
