import UserRepository from '../Repository/UserRepository.js';

class UserService {
    static async getAllUsers() {
        return await UserRepository.getAll();
    }

    static async findUser(id) {
        return await UserRepository.find(id);
    }

    static async createUser(userData) {
        const { name, email, age } = userData;
        return await UserRepository.create(name, email, age);
    }

    static async updateUser(id, userData) {
        const { name, email, age } = userData;
        return await UserRepository.update(id, name, email, age);
    }

    static async deleteUser(id) {
        return await UserRepository.delete(id);
    }
}

export default UserService;