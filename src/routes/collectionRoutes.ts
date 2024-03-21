import express from "express";

import { CollectionController } from "../controllers/collections";
import { checkPermission } from "../middleware/checkPermission";
import { checkToken } from "../middleware/checkToken";
import { validateBody } from "../utils/validation";

const collectionRoutes = express.Router();

collectionRoutes
  .get("/", CollectionController.getCollections)
  .get("/:id", CollectionController.getCollection)
  .post("/", checkToken, validateBody(["name", "description", "topic"], true), CollectionController.createCollection)
  .patch(
    "/:id",
    checkToken,
    checkPermission("collection"),
    validateBody(["name", "description", "topic", "img"]),
    CollectionController.updateCollection,
  )
  .delete("/", checkToken, validateBody(["ids"]), CollectionController.deleteCollection);

export { collectionRoutes };
