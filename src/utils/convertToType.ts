import { Type } from "@prisma/client";

export const convertToType = (type: string): Type => {
  switch (type) {
    case "INTEGER":
      return Type.INTEGER;
    case "STRING":
      return Type.STRING;
    case "MULTILINE_TEXT":
      return Type.MULTILINE_TEXT;
    case "BOOLEAN":
      return Type.BOOLEAN;
    case "DATE":
      return Type.DATE;
    default:
      throw new Error("Invalid type");
  }
};
