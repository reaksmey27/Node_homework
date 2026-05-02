import User from '../models/user.js';
import BaseController from './baseController.js';

class UserController extends BaseController {
  async getAllUsers(req, res) {
    try {
      const users = await User.getAllUsers();
      return this.success(res, 'Users retrieved successfully', users);
    } catch (error) {
      return this.error(res, error.message);
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.getUserById(id);

      if (!user) {
        return this.error(res, 'User not found', 404);
      }

      return this.success(res, 'User retrieved successfully', user);
    } catch (error) {
      return this.error(res, error.message);
    }
  }

  async createUser(req, res) {
    try {
      const { name, email, age } = req.body;
      const hasName = name != null && name !== '';
      const hasEmail = email != null && email !== '';
      const hasAge = age != null;

      if (hasName && hasEmail && hasAge) {
        const parsedAge = Number(age);

        if (Number.isNaN(parsedAge) || parsedAge <= 0) {
          return this.error(res, 'age must be a positive number', 400);
        }

        const user = new User(null, name.trim(), email.trim(), parsedAge);
        await user.save();

        return this.success(res, 'User created successfully', user, 201);
      }

      return this.error(res, 'name, email, and age are required', 400);
    } catch (error) {
      return this.error(res, error.message);
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email, age } = req.body;

      const existingUser = await User.getUserById(id);
      if (!existingUser) {
        return this.error(res, 'User not found', 404);
      }

      if (name == null && email == null && age == null) {
        return this.error(res, 'At least one field (name, email, age) is required', 400);
      }

      const parsedAge = age == null ? existingUser.age : Number(age);
      if (age != null && (Number.isNaN(parsedAge) || parsedAge <= 0)) {
        return this.error(res, 'age must be a positive number', 400);
      }

      const user = new User(
        id,
        name ? name.trim() : existingUser.name,
        email ? email.trim() : existingUser.email,
        parsedAge
      );

      await user.update();
      return this.success(res, 'User updated successfully', user);
    } catch (error) {
      return this.error(res, error.message);
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.getUserById(id);

      if (!user) {
        return this.error(res, 'User not found', 404);
      }

      const deleted = await User.deleteUser(id);
      if (!deleted) {
        return this.error(res, 'Unable to delete user');
      }

      return this.success(res, 'User deleted successfully');
    } catch (error) {
      return this.error(res, error.message);
    }
  }
}

export default new UserController();
