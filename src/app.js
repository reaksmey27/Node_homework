import express from 'express';
import userRoutes from './routes/userrRoute.js';
import productRoutes from './routes/productRoute.js';

const app = express();

app.use(express.json());

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to REST API',
    endpoints: {
      users: {
        'GET /users': 'Get all users',
        'GET /users/:id': 'Get user by ID',
        'POST /users': 'Create a new user',
        'PUT /users/:id': 'Update a user',
        'DELETE /users/:id': 'Delete a user'
      },
      products: {
        'GET /products': 'Get all products',
        'GET /products/:id': 'Get product by ID',
        'POST /products': 'Create a new product',
        'PUT /products/:id': 'Update a product',
        'DELETE /products/:id': 'Delete a product'
      }
    }
  });
});

app.use('/users', userRoutes);
app.use('/products', productRoutes);

export default app;
