import ProductRepository from '../Repository/ProductRepository.js';

class ProductService {
    static async getAllProducts() {
        return await ProductRepository.getAll();
    }

    static async getProductById(id) {
        return await ProductRepository.find(id);
    }

    static async createProduct(productData) {
        // You could add validation here (e.g., if price < 0 throw error)
        return await ProductRepository.create(productData);
    }

    static async updateProduct(id, productData) {
        return await ProductRepository.update(id, productData);
    }

    static async deleteProduct(id) {
        return await ProductRepository.delete(id);
    }
}

export default ProductService;