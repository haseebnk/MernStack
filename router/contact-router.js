const express = require('express');
const router = express.Router();


const contactForm = require('../contollers/contact-controller')

router.route('/contact').post(authContoller.contactForm);




module.exports = router