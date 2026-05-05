import express from 'express';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productroute.js';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);

export default app;
