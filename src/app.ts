import cors from "cors";
import express from "express";

import { authRoutes } from "./routes/authRoutes";
import { collectionRoutes } from "./routes/collectionRoutes";
import { usersRouter } from "./routes/usersRoutes";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (_, res) => {
  res.send("Hello, world!");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/collections", collectionRoutes);
app.use("/api/v1/users", usersRouter);

export { app };
