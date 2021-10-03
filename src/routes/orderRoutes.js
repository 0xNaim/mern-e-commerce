import express from 'express';
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from '../controllers/orderController.js';
import { admin, auth } from '../middleware/authMiddleware.js';
const router = express.Router();

router
  .route('/api/orders')
  .post(auth, addOrderItems)
  .get(auth, admin, getOrders);
router.route('/api/orders/myorders').get(auth, getMyOrders);
router.route('/api/orders/:id').get(auth, getOrderById);
router.route('/api/orders/:id/pay').put(auth, updateOrderToPaid);
router
  .route('/api/orders/:id/deliver')
  .put(auth, admin, updateOrderToDelivered);

export default router;
