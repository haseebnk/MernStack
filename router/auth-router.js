const express = require('express');

const router = express.Router();
const authContoller = require('../contollers/auth-controller')

const signupSchema = require('../validators/auth-validators')
const validate = require('../middlewares/validate-middleware');
const loginShcema = require('../validators/auth-validators');

// router.get('/', (req, res) => {
//     res.status(200).send("Welcome best haseeb router");
// });

router.route('/').get(authContoller.home);

router
    .route(`/register`)
    .post(validate(signupSchema), authContoller.register);


router
    .route(`/login`)
    .post(validate(loginShcema), authContoller.login);



module.exports = router