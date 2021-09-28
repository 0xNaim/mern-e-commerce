import express from 'express';
import {
  deleteProduct,
  getProductById,
  getProducts,
} from '../controllers/productController.js';
import { admin, auth } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/api/products').get(getProducts);
router
  .route('/api/products/:id')
  .get(getProductById)
  .delete(auth, admin, deleteProduct);

export default router;
