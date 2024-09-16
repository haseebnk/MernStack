require('dotenv').config();
const express = require('express');
const app = express();

const authRoute = require('./router/auth-router');
const contactRoute = require('./router/contact-router')

const connectDb = require('./utils/db');
const errorMiddleware = require('./middlewares/error-middleware');

app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/form', contactRoute);


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
