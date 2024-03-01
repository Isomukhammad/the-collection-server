import { Request, Response, NextFunction } from "express";
import { roles } from "../config/roles";

interface User {
  role: string;
}

interface RequestWithUser extends Request {
  user: User;
}

export const checkRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as RequestWithUser).user.role;

    if (role === roles.ADMIN) {
      return next();
    } else {
      return res.status(403).json({
        message: "Unauthorized access",
      });
    }
  };
};
