import { Request, Response } from "express";
import { prisma } from "../server";
import jwt from "jsonwebtoken";
import { createHash } from "node:crypto";

const generateToken = (user: {
  id: number;
  username: string;
  email: string;
}) => {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET not found");

  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );
};

class UserController {
  async getAllUsers(_: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }

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
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }

  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
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

    const token = generateToken(user);
    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
    });
  }
}

export default new UserController();
