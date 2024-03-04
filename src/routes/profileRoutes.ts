import express from "express";
import ProfileController from "../controllers/profileController";
import { checkToken } from "../middleware/checkToken";

export const profileRoutes = express.Router();

profileRoutes.get("/", checkToken, ProfileController.getProfileByToken);
