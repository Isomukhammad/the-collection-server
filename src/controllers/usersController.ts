import { Request, Response } from "express";
import { prisma } from "../server";

class UsersController {
  async getAllUsers(_: Request, res: Response) {
    try {
      const users = await prisma.user.findMany({
        orderBy: {
          id: "desc",
        },
        where: {
          isDeleted: false,
        },
      });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async blockUserById(req: Request, res: Response) {
    const { ids } = req.body;

    try {
      let users;

      if (ids.length === 1) {
        users = await prisma.user.update({
          where: {
            id: ids[0],
          },
          data: {
            isBlocked: true,
          },
        });
      } else {
        users = await prisma.user.updateMany({
          where: {
            id: {
              in: ids,
            },
          },
          data: {
            isBlocked: true,
          },
        });
      }
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async unblockUserById(req: Request, res: Response) {
    const { ids } = req.body;
    try {
      let users;

      if (ids.length === 1) {
        users = await prisma.user.update({
          where: {
            id: ids[0],
          },
          data: {
            isBlocked: false,
          },
        });
      } else {
        users = await prisma.user.updateMany({
          where: {
            id: {
              in: ids,
            },
          },
          data: {
            isBlocked: false,
          },
        });
      }
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteUserById(req: Request, res: Response) {
    const { ids } = req.body;

    try {
      let users;

      if (ids.length === 1) {
        users = await prisma.user.update({
          where: {
            id: ids[0],
          },
          data: {
            isDeleted: true,
          },
        });
      } else {
        users = await prisma.user.updateMany({
          where: {
            id: {
              in: ids,
            },
          },
          data: {
            isDeleted: true,
          },
        });
      }
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json(error);
    }
  }
}

export default new UsersController();
