const express = require('express');
const app = express();
const router = require('./router/auth-router');
const connectDb = require('./utils/db');

app.use(express.json());

// Log all incoming requests
app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
});

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

// Catch-all route for debugging
app.use('*', (req, res) => {
    res.status(404).json({
        message: "Route not found",
        requestedUrl: req.originalUrl,
        method: req.method
    });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDb();
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
            console.log('Environment:', process.env.NODE_ENV || 'development');
            console.log('RAILWAY_STATIC_URL:', process.env.RAILWAY_STATIC_URL || 'Not set');
            console.log('API available at:');
            console.log(`https://${process.env.RAILWAY_STATIC_URL}/api/auth/*`);
        });
    } catch (error) {
        console.error("Failed to start the server:", error);
    }
};

startServer();