import jwt from "jsonwebtoken";

import { IToken } from "../types";

export const decodeJwt = (token: string): IToken => {
  return jwt.verify(token, process.env.JWT_SECRET!) as IToken;
};
