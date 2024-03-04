import cors from "cors";
import express from "express";

import { profileRoutes } from "./routes/profileRoutes";
import { authRoutes } from "./routes/authRoutes";
import { usersRouter } from "./routes/usersRoutes";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/users", usersRouter);

export { app };
