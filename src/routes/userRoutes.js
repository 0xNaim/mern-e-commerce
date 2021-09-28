import express from 'express';
import {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  registerUser,
  updateUser,
  updateUserProfile,
} from '../controllers/userController.js';
import { admin, auth } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/api/users').post(registerUser).get(auth, admin, getUsers);
router.post('/api/users/login', authUser);
router.route('/api/users/profile').get(auth, getUserProfile);
router.route('/api/users/profile').put(auth, updateUserProfile);
router
  .route('/api/users/:id')
  .delete(auth, admin, deleteUser)
  .get(auth, admin, getUserById)
  .put(auth, admin, updateUser);

export default router;
