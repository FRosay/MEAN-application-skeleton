const express = require('express');
const router = express.Router();
const User = require('../../model/user/controller');

router.post('/new', (req, res) => {

    if (!req.body.user) {
        return res.status(500).send({status:500, message: "request does not contain any user info"});
    } else {
        User.create(req.body.user)
            .then((user) => {
                res.status(200).send({status: 200, user})
            })
            .catch((err) => {
                res.status(500).send({status:500, message: err})
            })
    }

});

router.get('/all', (req, res) => {
    User.getAll()
        .then((users) => 
            res.status(200).send({status:200, users: users}))
        .catch((error) => 
            res.status(500).send({status:500, message: err}))
})

module.exports = router;
