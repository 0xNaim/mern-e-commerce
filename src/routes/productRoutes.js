import express from 'express';
import {
  getProductById,
  getProducts,
} from '../controllers/productController.js';
const router = express.Router();

router.route('/api/products').get(getProducts);
router.route('/api/products/:id').get(getProductById);

export default router;
