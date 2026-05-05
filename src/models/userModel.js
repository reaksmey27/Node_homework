import { getConnection } from '../config/db.js';

export class UserModel {
    static getAll = async () => {
        const connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM users');
        return rows;
    };

    static create = async (name) => {
        const connection = await getConnection();
        const sql = 'INSERT INTO users (user) VALUES (?)';
        const [result] = await connection.execute(sql, [name]);
        return { id: result.insertId, name };
    };

    static find = async (id) => {
        const connection = await getConnection();
        const sql = 'SELECT * FROM users WHERE id = ?';
        const [rows] = await connection.execute(sql, [id]);
        return rows[0];
    };

    static update = async (name, id) => {
        const connection = await getConnection();
        const sql = 'UPDATE users SET user = ? WHERE id = ?';
        await connection.execute(sql, [name, id]);
        return { id, name };
    };

    static delete = async (id) => {
        const connection = await getConnection();
        const sql = 'DELETE FROM users WHERE id = ?';
        await connection.execute(sql, [id]);
        return true;
    };
}