import ProductService from '../Services/ProductService.js';
import { BaseController } from './baseController.js';

class ProductController extends BaseController {
    getProducts = async (req, res) => {
        try {
            const products = await ProductService.getAllProducts();
            this.success(res, 200, 'List of products', products);
        } catch (error) {
            this.error(res, 500, error.message);
        }
    }

    createProduct = async (req, res) => {
        try {
            const product = await ProductService.createProduct(req.body);
            this.success(res, 201, 'Created product', product);
        } catch (error) {
            this.error(res, 500, error.message);
        }
    }

    updateProduct = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const exists = await ProductService.getProductById(id);
            
            if (!exists) return this.error(res, 404, 'Product not found');

            const updated = await ProductService.updateProduct(id, req.body);
            this.success(res, 200, 'Updated product', updated);
        } catch (error) {
            this.error(res, 500, error.message);
        }
    }

    deleteProduct = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const exists = await ProductService.getProductById(id);
            
            if (!exists) return this.error(res, 404, 'Product not found');

            await ProductService.deleteProduct(id);
            this.success(res, 200, 'Deleted product');
        } catch (error) {
            this.error(res, 500, error.message);
        }
    }
}

export default ProductController;
