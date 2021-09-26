import express from 'express';
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
} from '../controllers/orderController.js';
import { auth } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/api/orders').post(auth, addOrderItems);
router.route('/api/orders/myorders').get(auth, getMyOrders);
router.route('/api/orders/:id').get(auth, getOrderById);
router.route('/api/orders/:id/pay').put(auth, updateOrderToPaid);

export default router;
