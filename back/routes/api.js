const express = require('express');
const router = express.Router();
const user = require('./user/user');

/* GET home page. */
router.use('/user', user);

module.exports = router;
