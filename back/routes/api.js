const express = require('express');
const router = express.Router();
const user = require('./user/user');
const registration = require('./registration/registration');

router.use('/user', user);
router.use('/registration', registration);

module.exports = router;
