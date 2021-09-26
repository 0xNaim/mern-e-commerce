import express from 'express';
import {
  authUser,
  getUserProfile,
  getUsers,
  registerUser,
  updateUserProfile,
} from '../controllers/userController.js';
import { admin, auth } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/api/users').post(registerUser).get(auth, admin, getUsers);
router.post('/api/users/login', authUser);
router.route('/api/users/profile').get(auth, getUserProfile);
router.route('/api/users/profile').put(auth, updateUserProfile);

export default router;
