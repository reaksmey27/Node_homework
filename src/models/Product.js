// src/models/Product.js
import { getConnection } from '../config/db.js';
import { BaseModel } from './BaseModel.js';

export class Product extends BaseModel {
    static async getAll() {
        const conn = await getConnection();
        const [rows] = await conn.query('SELECT * FROM products');
        return rows;
    }

    static async create(name, price) {
        const conn = await getConnection();
        const [result] = await conn.execute(
            'INSERT INTO products (name, price) VALUES (?, ?)',
            [name, price]
        );
        return { id: result.insertId, name, price };
    }

    static async find(id) {
        const conn = await getConnection();
        const [rows] = await conn.execute(
            'SELECT * FROM products WHERE id = ?',
            [id]
        );
        return rows[0];
    }

    static async update(name, price, id) {
        const conn = await getConnection();
        await conn.execute(
            'UPDATE products SET name = ?, price = ? WHERE id = ?',
            [name, price, id]
        );
        return { id, name, price };
    }

    static async delete(id) {
        const conn = await getConnection();
        await conn.execute(
            'DELETE FROM products WHERE id = ?',
            [id]
        );
        return true;
    }
}

export default Product;