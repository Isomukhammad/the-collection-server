import express from "express";

import { ItemController } from "../controllers/items";
import { checkItemPermission } from "../middleware/checkItemPermission";
import { checkToken } from "../middleware/checkToken";
import { validateBody } from "../utils/validation";

const itemRoutes = express.Router();

itemRoutes
  .get("/", ItemController.getItems)
  .post("/", checkToken, validateBody(["collection_id", "name", "tags"]), ItemController.createItem)
  .get("/:id", ItemController.getItem)
  .patch("/:id", checkToken, checkItemPermission, ItemController.deleteItem);

export { itemRoutes };
