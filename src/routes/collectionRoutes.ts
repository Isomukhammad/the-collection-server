import express from "express";

import { CollectionController } from "../controllers/collections";
import { checkCollectionPermission } from "../middleware/checkCollectionPermission";
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
    checkCollectionPermission,
    validateBody(["name", "description", "topic", "img"]),
    CollectionController.updateCollection,
  )
  .delete("/:id", checkToken, checkCollectionPermission, CollectionController.deleteCollection);

export { collectionRoutes };
