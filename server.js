const express = require('express');
const app = express();
const router = require('./router/auth-router');
const connectDb = require('./utils/db');

app.use(express.json());

app.use('/api/auth', router);

// Add a simple health check route
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Server is running",
        environment: process.env.NODE_ENV || 'development',
        RAILWAY_STATIC_URL: process.env.RAILWAY_STATIC_URL || 'Not set',
        PORT: process.env.PORT || 5000
    });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDb();
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
            
            // Log info about the deployment
            console.log('Environment:', process.env.NODE_ENV || 'development');
            console.log('RAILWAY_STATIC_URL:', process.env.RAILWAY_STATIC_URL || 'Not set');
            
            if (process.env.RAILWAY_STATIC_URL) {
                console.log('Deployed on Railway. Your API is available at:');
                console.log(`${process.env.RAILWAY_STATIC_URL}/api/auth/*`);
                console.log('Replace * with your specific endpoints');
            } else {
                console.log('Running locally or RAILWAY_STATIC_URL is not set. API available at:');
                console.log(`http://localhost:${PORT}/api/auth/*`);
            }
        });
    } catch (error) {
        console.error("Failed to start the server:", error);
    }
};

startServer();