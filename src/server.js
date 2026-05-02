import app from './app.js';
import pool from './config/db.js';

const PORT = process.env.PORT || 3000;

// Test database connection
try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL Pool Connected');
    connection.release();
} catch (error) {
    console.error('❌ Database Connection Error:', error.message);
    process.exit(1);
}

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received: closing HTTP server');
    process.exit(0);
});
