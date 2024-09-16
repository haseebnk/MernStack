require('dotenv').config();
const express = require('express');
const app = express();

const router = require('./router/auth-router');
const connectDb = require('./utils/db');
const errorMiddleware = require('./middlewares/error-middleware');

app.use(express.json());

app.use('/api/auth', router);


// app.get('/', (req, res) => {
//     res.status(200).send("Welcome best haseeb");
// });
// app.get('/reg', (req, res) => {
//     res.status(200).send("Welcome reg");
// });

app.use(errorMiddleware)

const PORT = 5000;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running at:", PORT);
    });
})
