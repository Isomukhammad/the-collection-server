import express from "express";

import { ItemController } from "../controllers/items";
import { checkPermission } from "../middleware/checkPermission";
import { checkToken } from "../middleware/checkToken";
import { validateBody } from "../utils/validation";

const itemRoutes = express.Router();

itemRoutes
  .get("/", ItemController.getItems)
  .post("/", checkToken, ItemController.createItem)
  .patch("/:id", checkToken, checkPermission("item"), ItemController.deleteItem);

export { itemRoutes };
