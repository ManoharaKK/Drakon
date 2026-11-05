import express from 'express';
import upload from '../middleware/upload';
import { authenticate, authorizeRoles } from "../middleware/authMiddleware";



import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';

const router = express.Router();

router.route('/').get(getProducts).post(
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 10 },
  ]),
  createProduct
);

// User හෝ admin — products බලන්න
router.get("/", authenticate, getProducts);

// Admin only — product add/delete
router.post("/", authenticate, authorizeRoles("admin"), createProduct);
router.delete("/:id", authenticate, authorizeRoles("admin"), deleteProduct);

router.route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

export default router;