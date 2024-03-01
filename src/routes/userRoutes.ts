import express from "express";
import UserController from "../controllers/userController";
import { validateBody } from "../utils/validation";
import { checkRole } from "../middleware/auth";

const userRoutes = express.Router();

userRoutes
  .get("/", checkRole("ADMIN"), UserController.getAllUsers)
  .post(
    "/register",
    validateBody(["username", "email", "password"]),
    UserController.registerUser,
  )
  .post(
    "/login",
    validateBody(["email", "password"]),
    UserController.loginUser,
  );

export { userRoutes };
