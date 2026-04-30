import db from "../config/db.js";

class User {
  // GET ALL
  static async getAll() {
    const [rows] = await db.execute("SELECT * FROM users");
    return rows;
  }

  // GET BY ID
  static async getById(id) {
    const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  }

  // CREATE
  static async create({ name, email }) {
    const [result] = await db.execute(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email]
    );
    return result;
  }

  // UPDATE
  static async update(id, { name, email }) {
    const [result] = await db.execute(
      "UPDATE users SET name = COALESCE(?, name), email = COALESCE(?, email) WHERE id = ?",
      [name, email, id]
    );
    return result;
  }

  // DELETE
  static async delete(id) {
    const [result] = await db.execute("DELETE FROM users WHERE id = ?", [id]);
    return result;
  }
}

export default User;
