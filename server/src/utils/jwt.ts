import jwt from "jsonwebtoken";

export type Role = "user" | "admin";

export interface UserPayload {
  id: string;
  email: string;
  role: Role;
}

const SECRET = process.env.JWT_SECRET;
if (!SECRET) throw new Error("JWT_SECRET not defined in .env!");

export function signToken(payload: UserPayload): string {
  return jwt.sign(payload, SECRET!, { expiresIn: "7d" });
}

export function verifyToken(token: string): UserPayload | null {
  try {
    return jwt.verify(token, SECRET!) as UserPayload;
  } catch {
    return null;
  }
}