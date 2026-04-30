import { BaseController } from "./baseController.js";
import User from "../models/User.js";

class UserController extends BaseController {
  // GET all users
  getUsers = async (req, res) => {
    try {
      const users = await User.getAll();
      this.success(res, "Users retrieved successfully", users);
    } catch (error) {
      this.error(res, error.message, 500);
    }
  }

  // GET user by ID
  getUserById = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.getById(id);
      if (!user) return this.error(res, "User not found", 404);
      this.success(res, "User retrieved successfully", user);
    } catch (error) {
      this.error(res, error.message, 500);
    }
  }

  // Create user
  createUser = async (req, res) => {
    try {
      const { name, email } = req.body ?? {};
      if (!name || !email) {
        return this.error(res, "Name and email are required", 400);
      }
      const result = await User.create({ name, email });
      const user = await User.getById(result.insertId);
      this.success(res, "User created successfully", user, 201);
    } catch (error) {
      this.error(res, error.message, 500);
    }
  }

  // Update user
  updateUser = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await User.update(id, req.body);
      if (result.affectedRows === 0) return this.error(res, "User not found", 404);
      const updatedUser = await User.getById(id);
      this.success(res, "User updated successfully", updatedUser);
    } catch (error) {
      this.error(res, error.message, 500);
    }
  }

  // Delete user
  deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await User.delete(id);
      if (result.affectedRows === 0) return this.error(res, "User not found", 404);
      this.success(res, "User deleted successfully", { id });
    } catch (error) {
      this.error(res, error.message, 500);
    }
  }
}

export default new UserController();
