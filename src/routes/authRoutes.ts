import express from "express";
import UserController from "../controllers/authController";
import { validateBody } from "../utils/validation";

const authRoutes = express.Router();

authRoutes
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

export { authRoutes };
