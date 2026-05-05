import { UserModel as User } from "../models/userModel.js";
import { BaseController } from "./baseController.js";

export class UserController extends BaseController {

    usersList = async (req, res) => {
        try {
            const users = await User.getAll();
            this.success(res, 200, 'List of users', users);
        } catch (error) {
            this.error(res, 500, error.message);
        }
    }

    createUser = async (req, res) => {
        try {
            const { name } = req.body;
            const user = await User.create(name);
            this.success(res, 201, 'Created user', user);
        } catch (error) {
            this.error(res, 500, error.message);
        }
    }

    updateUser = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const { name } = req.body;

            const user = await User.find(id);
            if (!user) return this.error(res, 404, 'User not found');

            const updated = await User.update(name, id);
            this.success(res, 200, 'Updated user', updated);
        } catch (error) {
            this.error(res, 500, error.message);
        }
    }

    deleteUser = async (req, res) => {
        try {
            const id = parseInt(req.params.id);

            const user = await User.find(id);
            if (!user) return this.error(res, 404, 'User not found');

            await User.delete(id);
            this.success(res, 200, 'Deleted user');
        } catch (error) {
            this.error(res, 500, error.message);
        }
    }
}

export default UserController;
