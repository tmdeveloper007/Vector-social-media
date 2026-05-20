import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  const secret = process.env.JWT_SECRET || "fallback_secret";
  return jwt.sign(payload, secret, { expiresIn: "7d" });
};

export const getCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
};
