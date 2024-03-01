import { PrismaClient } from "@prisma/client";

import { app } from "./app";

export const prisma = new PrismaClient();
const PORT = process.env.PORT || 8080;

prisma
  .$connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("exit", async () => {
  await prisma.$disconnect();
});
