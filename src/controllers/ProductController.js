import Product from '../models/Product.js';
import BaseController from './baseController.js';

class ProductController extends BaseController {
    async getAllProducts(req, res) {
        try {
            const products = await Product.getAllProducts();
            return this.success(res, 'Products retrieved successfully', products);
        } catch (error) {
            return this.error(res, error.message);
        }
    }

    async getProductById(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.getProductById(id);

            if (!product) {
                return this.error(res, 'Product not found', 404);
            }

            return this.success(res, 'Product retrieved successfully', product);
        } catch (error) {
            return this.error(res, error.message);
        }
    }

    async createProduct(req, res) {
        try {
            const { name, description, price, stock } = req.body;
            const hasName = name != null && name !== '';
            const hasDescription = description != null && description !== '';
            const hasPrice = price != null;
            const hasStock = stock != null;

            if (hasName && hasDescription && hasPrice && hasStock) {
                const parsedPrice = parseFloat(price);
                const parsedStock = parseInt(stock);

                if (isNaN(parsedPrice) || parsedPrice <= 0) {
                    return this.error(res, 'Price must be a positive number', 400);
                }

                if (isNaN(parsedStock) || parsedStock < 0) {
                    return this.error(res, 'Stock must be a non-negative number', 400);
                }

                const product = new Product(
                    name.trim(),
                    description.trim(),
                    parsedPrice,
                    parsedStock
                );
                await product.save();

                return this.success(res, 'Product created successfully', product, 201);
            }

            return this.error(res, 'name, description, price, and stock are required', 400);
        } catch (error) {
            return this.error(res, error.message);
        }
    }

    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const { name, description, price, stock } = req.body;

            const existingProduct = await Product.getProductById(id);
            if (!existingProduct) {
                return this.error(res, 'Product not found', 404);
            }

            if (name == null && description == null && price == null && stock == null) {
                return this.error(res, 'At least one field is required', 400);
            }

            // Validate price if provided
            if (price != null) {
                const parsedPrice = parseFloat(price);
                if (isNaN(parsedPrice) || parsedPrice <= 0) {
                    return this.error(res, 'Price must be a positive number', 400);
                }
            }

            // Validate stock if provided
            if (stock != null) {
                const parsedStock = parseInt(stock);
                if (isNaN(parsedStock) || parsedStock < 0) {
                    return this.error(res, 'Stock must be a non-negative number', 400);
                }
            }

            const updatedData = {
                name: name ? name.trim() : existingProduct.name,
                description: description ? description.trim() : existingProduct.description,
                price: price != null ? parseFloat(price) : existingProduct.price,
                stock: stock != null ? parseInt(stock) : existingProduct.stock
            };

            const product = new Product(
                updatedData.name,
                updatedData.description,
                updatedData.price,
                updatedData.stock,
                id
            );

            await product.update(id, updatedData);
            return this.success(res, 'Product updated successfully', { id, ...updatedData });
        } catch (error) {
            return this.error(res, error.message);
        }
    }

    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.getProductById(id);

            if (!product) {
                return this.error(res, 'Product not found', 404);
            }

            const deleted = await Product.deleteProduct(id);
            if (!deleted) {
                return this.error(res, 'Unable to delete product');
            }

            return this.success(res, 'Product deleted successfully');
        } catch (error) {
            return this.error(res, error.message);
        }
    }
}

export default new ProductController();
