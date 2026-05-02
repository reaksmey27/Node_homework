import pool from '../config/db.js';

class BaseModel {
    constructor(tableName) {
        this.tableName = tableName;
    }

    /**
     * Abstract method: Find all records
     * Must be implemented by subclass
     */
    async find(conditions = {}) {
        throw new Error('find() method must be implemented in subclass');
    }

    /**
     * Abstract method: Find a single record by ID
     * Must be implemented by subclass
     */
    async get(id) {
        throw new Error('get() method must be implemented in subclass');
    }

    /**
     * Abstract method: Create a new record
     * Must be implemented by subclass
     */
    async create(data) {
        throw new Error('create() method must be implemented in subclass');
    }

    /**
     * Abstract method: Update a record
     * Must be implemented by subclass
     */
    async update(id, data) {
        throw new Error('update() method must be implemented in subclass');
    }

    /**
     * Abstract method: Delete a record
     * Must be implemented by subclass
     */
    async delete(id) {
        throw new Error('delete() method must be implemented in subclass');
    }

    /**
     * Helper method: Build WHERE clause from conditions
     */
    buildWhereClause(conditions = {}) {
        const keys = Object.keys(conditions);
        if (keys.length === 0) return '';

        const whereClause = keys.map(key => `${key} = ?`).join(' AND ');
        const values = keys.map(key => conditions[key]);

        return { whereClause: `WHERE ${whereClause}`, values };
    }

    /**
     * Helper method: Build column names and placeholders for INSERT
     */
    buildInsertQuery(data) {
        const columns = Object.keys(data);
        const placeholders = columns.map(() => '?').join(', ');
        const values = columns.map(col => data[col]);

        return {
            columns: columns.join(', '),
            placeholders,
            values
        };
    }

    /**
     * Helper method: Build SET clause for UPDATE
     */
    buildUpdateQuery(data) {
        const columns = Object.keys(data);
        const setClause = columns.map(col => `${col} = ?`).join(', ');
        const values = columns.map(col => data[col]);

        return { setClause, values };
    }
}

export default BaseModel;
