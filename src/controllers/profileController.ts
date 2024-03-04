import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../server";
import { validateUser } from "../utils/validation";

class ProfileController {
  async getProfileByToken(req: Request, res: Response) {
    const token = req.token as string;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: number;
        email: string;
        role: string;
      };

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
  }
}

export default new ProfileController();
