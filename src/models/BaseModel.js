// src/models/BaseModel.js
export class BaseModel {
    constructor() {
        if (this.constructor === BaseModel) {
            throw new Error('❌ Cannot instantiate BaseModel directly');
        }
    }

    static getAll() {
        throw new Error('❌ getAll() must be implemented');
    }

    static create() {
        throw new Error('❌ create() must be implemented');
    }

    static find() {
        throw new Error('❌ find() must be implemented');
    }

    static update() {
        throw new Error('❌ update() must be implemented');
    }

    static delete() {
        throw new Error('❌ delete() must be implemented');
    }
}