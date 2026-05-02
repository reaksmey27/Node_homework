import express from 'express';
import productController from '../controllers/ProductController.js';

const router = express.Router();

const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = productController;

// GET all products
router.get('/', getAllProducts.bind(productController));

// GET product by ID
router.get('/:id', getProductById.bind(productController));

// POST create product
router.post('/', createProduct.bind(productController));

// PUT update product
router.put('/:id', updateProduct.bind(productController));

// DELETE product
router.delete('/:id', deleteProduct.bind(productController));

export default router;
