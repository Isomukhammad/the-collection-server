import jwt from "jsonwebtoken";

export const generateToken = (user: { id: number; email: string; role: string }) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
    },
  );
};
