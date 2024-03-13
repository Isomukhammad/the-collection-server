import express from "express";
import { validateBody } from "../utils/validation";
import { checkToken } from "../middleware/checkToken";
import { CollectionController } from "../controllers/collections";

const collectionRoutes = express.Router();

collectionRoutes
  .get("/", CollectionController.getCollections)
  .get("/:id", CollectionController.getCollection)
  .post(
    "/",
    checkToken,
    validateBody(["name", "description", "topic"], true),
    CollectionController.createCollection,
  )
  .patch(
    "/:id",
    checkToken,
    validateBody([
      "id",
      "name",
      "description",
      "topic",
      "img",
      "authorId",
      "items",
    ]),
    CollectionController.updateCollection,
  )
  .delete(
    "/",
    checkToken,
    validateBody(["ids"]),
    CollectionController.deleteCollection,
  );

export { collectionRoutes };
