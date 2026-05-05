import express from 'express';
import { ProductController } from '../controllers/ProductController.js';

const router = express.Router();
const productController = new ProductController();

// Product
router.get('/products', productController.getProducts);
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

export default router;