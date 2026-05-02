import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = userController;

// GET all users
router.get('/', getAllUsers.bind(userController));

// GET user by ID
router.get('/:id', getUserById.bind(userController));

// POST create user
router.post('/', createUser.bind(userController));

// PUT update user
router.put('/:id', updateUser.bind(userController));

// DELETE user
router.delete('/:id', deleteUser.bind(userController));

export default router;
