import BaseModel from './BaseModel.js';
import pool from '../config/db.js';

class User extends BaseModel {
  constructor(name, email, age, id = null) {
    super('users');
    this.id = id;
    this.name = name;
    this.email = email;
    this.age = age;
  }

  /**
   * Find all users or with specific conditions
   */
  async find(conditions = {}) {
    try {
      let query = `SELECT * FROM ${this.tableName}`;
      let values = [];

      if (Object.keys(conditions).length > 0) {
        const { whereClause, values: conditionValues } = this.buildWhereClause(conditions);
        query += ` ${whereClause}`;
        values = conditionValues;
      }

      const [rows] = await pool.query(query, values);
      return rows;
    } catch (error) {
      throw new Error(`Error finding users: ${error.message}`);
    }
  }

  /**
   * Get a single user by ID
   */
  async get(id) {
    try {
      const [rows] = await pool.query(
        `SELECT * FROM ${this.tableName} WHERE id = ?`,
        [id]
      );
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }

  /**
   * Create a new user
   */
  async create(data) {
    try {
      const { columns, placeholders, values } = this.buildInsertQuery(data);
      const [result] = await pool.query(
        `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders})`,
        values
      );
      return { id: result.insertId, ...data };
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  /**
   * Update a user by ID
   */
  async update(id, data) {
    try {
      const { setClause, values } = this.buildUpdateQuery(data);
      await pool.query(
        `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`,
        [...values, id]
      );
      return { id, ...data };
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  /**
   * Delete a user by ID
   */
  async delete(id) {
    try {
      const [result] = await pool.query(
        `DELETE FROM ${this.tableName} WHERE id = ?`,
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }

  // Legacy static methods for backward compatibility
  static async getAllUsers() {
    const user = new User('', '', 0);
    return user.find();
  }

  static async getUserById(id) {
    const user = new User('', '', 0);
    return user.get(id);
  }

  static async deleteUser(id) {
    const user = new User('', '', 0);
    return user.delete(id);
  }

  // Instance method for legacy code
  async save() {
    try {
      const data = {
        name: this.name,
        email: this.email,
        age: this.age
      };
      const result = await this.create(data);
      this.id = result.id;
      return this;
    } catch (error) {
      throw new Error(`Error saving user: ${error.message}`);
    }
  }
}

export default User;
