import express from "express";
import { checkRole } from "../middleware/checkRole";
import { Role } from "@prisma/client";
import usersController from "../controllers/usersController";
import { checkToken } from "../middleware/checkToken";
import { validateBody } from "../utils/validation";

const usersRouter = express.Router();

usersRouter
  .get("/", checkToken, checkRole(Role.ADMIN), usersController.getAllUsers)
  .patch(
    "/block",
    checkToken,
    checkRole(Role.ADMIN),
    validateBody(["ids"]),
    usersController.blockUserById,
  )
  .patch(
    "/unblock",
    checkToken,
    checkRole(Role.ADMIN),
    validateBody(["ids"]),
    usersController.unblockUserById,
  )
  .delete(
    "/delete",
    checkToken,
    checkRole(Role.ADMIN),
    validateBody(["ids"]),
    usersController.deleteUserById,
  );

export { usersRouter };
