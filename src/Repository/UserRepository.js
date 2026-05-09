import { getConnection } from '../config/db.js';

class UserRepository {
    static async getAll() {
        const conn = await getConnection();
        const [rows] = await conn.query('SELECT * FROM users');
        return rows;
    }

    static async find(id) {
        const conn = await getConnection();
        const [rows] = await conn.execute('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(name, email, age) {
        const conn = await getConnection();
        const [result] = await conn.execute(
            'INSERT INTO users (name, email, age) VALUES (?, ?, ?)',
            [name, email, age]
        );
        return { id: result.insertId, name, email, age };
    }

    static async update(id, name, email, age) {
        const conn = await getConnection();
        await conn.execute(
            'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?',
            [name, email, age, id]
        );
        return { id, name, email, age };
    }

    static async delete(id) {
        const conn = await getConnection();
        await conn.execute('DELETE FROM users WHERE id = ?', [id]);
        return true;
    }
}

export default UserRepository;
