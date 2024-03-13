import { createHash } from "node:crypto";

export const hashPassword = (password: string) =>
  createHash("SHA3-256")
    .update(password + process.env.PASSWORD_SALT)
    .digest("hex");
