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
        const server = app.listen(PORT, () => {
            const address = server.address();
            if (typeof address === 'string') {
                console.log(`Server is running on ${address}`);
            } else if (address && typeof address === 'object') {
                const host = address.address === '::' ? 'localhost' : address.address;
                const port = address.port;
                if (host === 'localhost') {
                    console.log(`Server is running on http://localhost:${port}`);
                } else {
                    console.log(`Server is running on http://${host}:${port}`);
                }
            } else {
                console.log(`Server is running on port ${PORT}`);
            }
        });
    } catch (error) {
        console.error("Failed to start the server:", error);
    }
};

startServer();