import express from 'express';
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/productController.js';
import { admin, auth } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/api/products').get(getProducts).post(auth, admin, createProduct);
router.route('/api/products/:id/reviews').post(auth, createProductReview);
router
  .route('/api/products/:id')
  .get(getProductById)
  .delete(auth, admin, deleteProduct)
  .put(auth, admin, updateProduct);

export default router;
