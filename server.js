const express = require('express');
const app = express();
const router = require('./router/auth-router');
const connectDb = require('./utils/db');

app.use(express.json());

app.use('/api/auth', router);

// Add a simple health check route
app.get('/', (req, res) => {
    res.status(200).send("Server is running");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDb();
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start the server:", error);
    }
};

startServer();