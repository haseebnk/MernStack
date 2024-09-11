const express = require('express');

const router = express.Router();
const authContoller = require('../contollers/auth-controller')

// router.get('/', (req, res) => {
//     res.status(200).send("Welcome best haseeb router");
// });

router.route('/').get(authContoller.home);

router.route(`/register`).post(authContoller.register);



module.exports = router