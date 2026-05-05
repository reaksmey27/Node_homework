import 'dotenv/config';
import express from 'express';
import userRoutes from './routes/userRoutes.js';
import { connectDatabase } from './config/db.js';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/', userRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await connectDatabase();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error(`Failed to start server: ${error.message || error}`);
        process.exit(1);
    }
}

startServer();
