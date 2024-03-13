import express from "express";
import { AuthController } from "../controllers/auth";
import { validateBody } from "../utils/validation";

const authRoutes = express.Router();

authRoutes
  .post(
    "/register",
    validateBody(["username", "email", "password"]),
    AuthController.registerUser,
  )
  .post(
    "/login",
    validateBody(["email", "password"]),
    AuthController.loginUser,
  );

export { authRoutes };
