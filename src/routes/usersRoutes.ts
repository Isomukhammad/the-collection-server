import { Role } from "@prisma/client";
import express from "express";

import { UsersController } from "../controllers/users";
import { checkIUserEditPermission } from "../middleware/checkIUserEditPermission";
import { checkRole } from "../middleware/checkRole";
import { checkToken } from "../middleware/checkToken";
import { validateBody } from "../utils/validation";

const usersRouter = express.Router();

usersRouter
  .get("/", checkToken, checkRole(Role.ADMIN), UsersController.getAllUsers)
  .get("/info", checkToken, UsersController.getUser)
  .patch("/update", checkToken, UsersController.editUser)
  .patch("/block", checkToken, checkRole(Role.ADMIN), validateBody(["ids"]), UsersController.blockUsers)
  .patch("/unblock", checkToken, checkRole(Role.ADMIN), validateBody(["ids"]), UsersController.unblockUsers)
  .delete("/delete", checkToken, checkRole(Role.ADMIN), validateBody(["ids"]), UsersController.deleteUsers);

export { usersRouter };
