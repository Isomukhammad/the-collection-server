import express from "express";

import { TagsController } from "../controllers/tags";

const tagsRouter = express.Router();

tagsRouter.get("/", TagsController.getTags);

export { tagsRouter };
