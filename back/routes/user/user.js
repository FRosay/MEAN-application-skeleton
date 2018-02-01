const express = require('express');
const router = express.Router();
const User = require('../../model/user');

router.post('/new', (req, res) => {
    console.log(req.body);
    if (!req.body.user) {
        return res.status(500).send("request does not contain any user info")
    } else {
        User.create(req.body.user)
            .then(() =>
                res.sendStatus(200))
            .catch((err) =>
                res.status(500).send(err))
    }
});

module.exports = router;
