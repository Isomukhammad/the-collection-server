import en from "./src/locales/en.json";

declare global {
  namespace Express {
    interface Request {
      token?: string;
      __: (key: keyof typeof en) => string;
    }
  }
}
