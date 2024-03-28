import express from "express";

import { LikesController } from "../controllers/likes";
import { checkToken } from "../middleware/checkToken";

const likeRoutes = express.Router();

likeRoutes
  .get("/", checkToken, LikesController.getUserLikes)
  .patch("/add", checkToken, LikesController.setLike)
  .patch("/remove", checkToken, LikesController.removeLike);

export { likeRoutes };
