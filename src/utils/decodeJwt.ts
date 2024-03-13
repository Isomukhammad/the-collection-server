import jwt from "jsonwebtoken";

export const decodeJwt = <T>(token: string): T => {
  return jwt.verify(token, process.env.JWT_SECRET!) as T;
};
