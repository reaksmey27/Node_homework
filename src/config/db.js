import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let connection;

export const connectDatabase = async () => {
    connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE, // ✅ FIXED
        port: process.env.DB_PORT
    });

    console.log('✅ Connected to DB:', process.env.DB_DATABASE);
};

export const getConnection = () => {
    if (!connection) {
        throw new Error('❌ DB not connected');
    }
    return connection;
};