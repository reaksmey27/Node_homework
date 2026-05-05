import 'dotenv/config';
import app from './app.js';
import { connectDatabase } from './config/db.js';

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
