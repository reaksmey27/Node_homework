// src/models/User.js
import { getConnection } from '../config/db.js';
import { BaseModel } from './BaseModel.js';

export class UserModel extends BaseModel {
    static async getAll() {
        const conn = await getConnection();
        const [rows] = await conn.query('SELECT * FROM users');
        return rows;
    }

    static async create(name) {
        const conn = await getConnection();
        const [result] = await conn.execute(
            'INSERT INTO users (name) VALUES (?)',
            [name]
        );
        return { id: result.insertId, name };
    }

    static async find(id) {
        const conn = await getConnection();
        const [rows] = await conn.execute(
            'SELECT * FROM users WHERE id = ?',
            [id]
        );
        return rows[0];
    }

    static async update(name, id) {
        const conn = await getConnection();
        await conn.execute(
            'UPDATE users SET name = ? WHERE id = ?',
            [name, id]
        );
        return { id, name };
    }

    static async delete(id) {
        const conn = await getConnection();
        await conn.execute(
            'DELETE FROM users WHERE id = ?',
            [id]
        );
        return true;
    }
}
 
export default UserModel;
