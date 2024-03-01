import express from "express";
import {
  createUser,
  deleteUserById,
  getAllUsers,
} from "../controllers/userController";

const userRoutes = express.Router();

userRoutes.get("/", getAllUsers).post("/", createUser);
userRoutes.delete("/:id", deleteUserById);

export { userRoutes };
