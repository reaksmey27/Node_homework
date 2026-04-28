import User from "../models/User.js";

class UserController {
  // GET ALL
  async getUsers(req, res) {
    try {
      const users = await User.getAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET BY ID
  async getUserById(req, res) {
    try {
      const { id } = req.params;

      const user = await User.getById(id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // CREATE
  async createUser(req, res) {
    try {
      const { name, email } = req.body; // destructuring

      if (!name || !email) {
        return res.status(400).json({ message: "Missing fields" });
      }

      const result = await User.create({ name, email });

      res.status(201).json({
        message: "User created",
        insertId: result.insertId,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // UPDATE
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email } = req.body;

      const result = await User.update(id, { name, email });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "User updated" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // DELETE
  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const result = await User.delete(id);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "User deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new UserController();