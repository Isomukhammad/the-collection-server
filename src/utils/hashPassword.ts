import { createHash } from "crypto";

export const hashPassword = (password: string) =>
  createHash("SHA3-256")
    .update(password + process.env.PASSWORD_SALT)
    .digest("hex");

export const saltedPassword = (password: string) =>
  createHash("SHA3-256")
    .update(password + process.env.PASSWORD_SALT)
    .digest("hex");
