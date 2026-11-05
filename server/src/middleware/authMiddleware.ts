import { Request, Response, NextFunction } from "express";
import { verifyToken, Role } from "../utils/jwt";

// Request-ෙ user info attach කරන්න type extend කරනවා
declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email: string; role: Role };
    }
  }
}

// Token verify කරනවා
export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  const payload = verifyToken(token);

  if (!payload) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  req.user = payload; // Route-ෙ req.user use කරන්න පුළුවන්
  next();
}

// Role check කරනවා — authenticate() පස්සෙ use කරනවා
export function authorizeRoles(...roles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
}