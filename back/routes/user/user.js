const express = require('express');
const router = express.Router();
const User = require('../../model/user');

router.post('/new', (req, res) => {
    if (!req.body.user) {
        return res.status(500).send({status:500, message: "request does not contain any user info"});

    } else {
        User.create(req.body.user)
            .then(() => {
                res.status(200).send({status: 200})
            })
            .catch((err) =>
                res.status(500).send({status:500, message: err}))
    }

});

module.exports = router;
