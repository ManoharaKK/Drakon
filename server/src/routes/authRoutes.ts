import { Router } from "express";
import { register, login, getMe, listUsers } from "../controllers/authController";
import { authenticate, authorizeRoles } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticate, getMe); // Protected route
router.get(
  "/users",
  authenticate,
  authorizeRoles("admin"),
  listUsers
);

export default router;