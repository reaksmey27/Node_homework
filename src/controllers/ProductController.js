import { Product } from "../models/Product.js";
import { BaseController } from "./baseController.js";

export class ProductController extends BaseController {

    getProducts = async (req, res) => {
        try {
            const products = await Product.getAll();
            this.success(res, 200, 'List of products', products);
        } catch (error) {
            this.error(res, 500, error.message);
        }
    }

    createProduct = async (req, res) => {
        try {
            const { name, price } = req.body;
            const product = await Product.create(name, price);
            this.success(res, 201, 'Created product', product);
        } catch (error) {
            this.error(res, 500, error.message);
        }
    }

    updateProduct = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const { name, price } = req.body;

            const product = await Product.find(id);
            if (!product) return this.error(res, 404, 'Product not found');

            const updated = await Product.update(name, price, id);
            this.success(res, 200, 'Updated product', updated);
        } catch (error) {
            this.error(res, 500, error.message);
        }
    }

    deleteProduct = async (req, res) => {
        try {
            const id = parseInt(req.params.id);

            const product = await Product.find(id);
            if (!product) return this.error(res, 404, 'Product not found');

            await Product.delete(id);
            this.success(res, 200, 'Deleted product');
        } catch (error) {
            this.error(res, 500, error.message);
        }
    }
}

export default ProductController;