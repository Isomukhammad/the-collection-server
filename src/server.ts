import { PrismaClient } from "@prisma/client";

import { app } from "./app";

export const prisma = new PrismaClient();
const PORT = process.env.PORT || 8080;

if (!process.env.JWT_SECRET || !process.env.PASSWORD_SALT) {
  console.error("JWT_SECRET or PASSWORD_SALT not found");
  process.exit(1);
}

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
