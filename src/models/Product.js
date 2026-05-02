import BaseModel from './BaseModel.js';
import pool from '../config/db.js';

class Product extends BaseModel {
    constructor(name, description, price, stock, id = null) {
        super('products');
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
    }

    /**
     * Find all products or with specific conditions
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
            throw new Error(`Error finding products: ${error.message}`);
        }
    }

    /**
     * Get a single product by ID
     */
    async get(id) {
        try {
            const [rows] = await pool.query(
                `SELECT * FROM ${this.tableName} WHERE id = ?`,
                [id]
            );
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw new Error(`Error fetching product: ${error.message}`);
        }
    }

    /**
     * Create a new product
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
            throw new Error(`Error creating product: ${error.message}`);
        }
    }

    /**
     * Update a product by ID
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
            throw new Error(`Error updating product: ${error.message}`);
        }
    }

    /**
     * Delete a product by ID
     */
    async delete(id) {
        try {
            const [result] = await pool.query(
                `DELETE FROM ${this.tableName} WHERE id = ?`,
                [id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error deleting product: ${error.message}`);
        }
    }

    // Static methods for convenience
    static async getAllProducts() {
        const product = new Product('', '', 0, 0);
        return product.find();
    }

    static async getProductById(id) {
        const product = new Product('', '', 0, 0);
        return product.get(id);
    }

    static async deleteProduct(id) {
        const product = new Product('', '', 0, 0);
        return product.delete(id);
    }

    // Instance method for saving
    async save() {
        try {
            const data = {
                name: this.name,
                description: this.description,
                price: this.price,
                stock: this.stock
            };
            const result = await this.create(data);
            this.id = result.id;
            return this;
        } catch (error) {
            throw new Error(`Error saving product: ${error.message}`);
        }
    }
}

export default Product;
