import { Request, Response } from "express";
import User from "../models/User";
import { signToken } from "../utils/jwt";

function isAdminCredentials(email: string, password: string): boolean {
  const adminEmail = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
  const adminPassword = (process.env.ADMIN_PASSWORD ?? "").trim();
  return (
    Boolean(adminEmail && adminPassword) &&
    email === adminEmail &&
    password === adminPassword
  );
}

// Register
export async function register(req: Request, res: Response) {
  try {
    const { email, password } = req.body ?? {};
    const normalizedEmail =
      typeof email === "string" ? email.trim().toLowerCase() : "";

    if (!normalizedEmail) {
      return res.status(400).json({ error: "Email is required" });
    }
    if (typeof password !== "string" || password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    const normalizedRole = isAdminCredentials(normalizedEmail, password) ? "admin" : "user";

    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const user = await User.create({
      email: normalizedEmail,
      password,
      role: normalizedRole,
    });
    const token = signToken({ id: user.id, email: user.email, role: user.role });

    res.status(201).json({ token, role: user.role });
  } catch (err) {
    // Mongoose duplicate key (race condition / concurrent requests).
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code?: number }).code === 11000
    ) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Mongoose schema validation errors.
    if (
      typeof err === "object" &&
      err !== null &&
      "name" in err &&
      (err as { name?: string }).name === "ValidationError"
    ) {
      return res.status(400).json({ error: "Invalid registration data" });
    }

    res.status(500).json({
      error: "Registration failed",
      details: err instanceof Error ? err.message : "Unknown error",
    });
  }
}

// Login
export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body ?? {};
    const normalizedEmail =
      typeof email === "string" ? email.trim().toLowerCase() : "";

    if (!normalizedEmail || typeof password !== "string") {
      return res.status(400).json({ error: "Email and password are required" });
    }

    /**
     * Env admin: works even if this user was never registered.
     * If they already exist, sync password + role so changing ADMIN_* in .env still works after restart.
     */
    if (isAdminCredentials(normalizedEmail, password)) {
      let user = await User.findOne({ email: normalizedEmail });
      if (!user) {
        user = await User.create({
          email: normalizedEmail,
          password,
          role: "admin",
        });
      } else {
        user.role = "admin";
        user.password = password;
        await user.save();
      }
      const token = signToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });
      return res.json({ token, role: user.role });
    }

    const user = await User.findOne({ email: normalizedEmail });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = signToken({ id: user.id, email: user.email, role: user.role });

    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
}

// Get current user (JWT + DB profile fields, no password)
export async function getMe(req: Request, res: Response) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const doc = await User.findById(req.user.id).select(
      "email role createdAt updatedAt"
    );
    if (!doc) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({
      user: {
        id: doc.id,
        email: doc.email,
        role: doc.role,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      },
    });
  } catch {
    res.status(500).json({ error: "Failed to load profile" });
  }
}

/** Admin only — list all users (no passwords) */
export async function listUsers(_req: Request, res: Response) {
  try {
    const rows = await User.find()
      .select("email role createdAt updatedAt")
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      data: rows.map((u) => ({
        id: String(u._id),
        email: u.email,
        role: u.role,
        createdAt: u.createdAt,
        updatedAt: u.updatedAt,
      })),
    });
  } catch {
    res.status(500).json({ error: "Failed to load users" });
  }
}