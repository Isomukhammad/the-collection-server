import cors from "cors";
import express from "express";

import { userRoutes } from "./routes/userRoutes";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/api/v1/users", userRoutes);

export { app };
