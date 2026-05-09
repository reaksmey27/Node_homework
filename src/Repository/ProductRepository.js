import { getConnection } from '../config/db.js';

class ProductRepository {
    static async getAll() {
        const conn = await getConnection();
        const [rows] = await conn.query('SELECT * FROM products ORDER BY created_at DESC');
        return rows;
    }

    static async find(id) {
        const conn = await getConnection();
        const [rows] = await conn.execute('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(data) {
        const conn = await getConnection();
        const name = data.name || null;
        const description = data.description || null;
        const price = data.price || 0;
        const stock = data.stock || 0;

        const [result] = await conn.execute(
            'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)',
            [name, description, price, stock]
        );
        return { id: result.insertId, ...data };
    }

    static async update(id, data) {
        const conn = await getConnection();
        const name = data.name || null;
        const description = data.description || null;
        const price = data.price || 0;
        const stock = data.stock || 0;

        await conn.execute(
            'UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?',
            [name, description, price, stock, id]
        );
        return { id, ...data };
    }

    static async delete(id) {
        const conn = await getConnection();
        await conn.execute('DELETE FROM products WHERE id = ?', [id]);
        return true;
    }
}

export default ProductRepository;