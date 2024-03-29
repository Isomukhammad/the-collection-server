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
  .delete("/:id", checkToken, checkItemPermission, ItemController.deleteItem)
  .patch("/:id", checkToken, checkItemPermission, validateBody(["name", "tags"]), ItemController.editItem);

export { itemRoutes };
