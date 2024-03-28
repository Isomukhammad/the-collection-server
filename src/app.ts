import cors from "cors";
import express from "express";

import i18n from "./config/i18n";
import { authRoutes } from "./routes/authRoutes";
import { collectionRoutes } from "./routes/collectionRoutes";
import { itemRoutes } from "./routes/itemRoutes";
import { likeRoutes } from "./routes/likeRoutes";
import { tagsRouter } from "./routes/tagsRoutes";
import { usersRouter } from "./routes/usersRoutes";

const app = express();

app.use(
  express.json({
    limit: "1mb",
  }),
);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(i18n.init);

app.get("/", (_, res) => {
  res.send("Hello, world!");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/collections", collectionRoutes);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/items", itemRoutes);
app.use("/api/v1/tags", tagsRouter);
app.use("/api/v1/like", likeRoutes);

export { app };
