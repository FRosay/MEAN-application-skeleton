const express = require('express');
const router = express.Router();
const Registration = require('../../model/registration/controller');
const logger = require('../../logger');

router.post('/new', (req, res) => {
    if (!req.body.registration) {
        return res.status(500).send({ status: 500, message: "request does not contain a registration" });

    } else {
        logger.info(req.body.registration);
        Registration.create(req.body.registration)
            .then((registration) => {
                logger.info('creating registration ', registration);
                res.status(200).send({ status: 200, registration })
            })
            .catch((err) => {
                logger.error(err);
                res.status(500).send({ status: 500, message: err }
                )
            })
    }
});

router.get('/next', (req, res) => {
    Registration.getNext()
        .then((registration) =>
            res.status(200).send({ status: 200, registration }))
        .catch((error) =>
            res.status(500).send({ status: 500, message: err }))
})

router.post('/update', (req, res) => {
    if (!req.body.registration) {
        const error = new Error("no registration provided for update");
        logger.error(error);
        res.status(400).send(error)
    } else {
        Registration.update(req.body.registration)
            .then((registration) => {
                res.status(200).send({ status: 200, registration });
                logger.info('updating registration ', registration);
            })
            .catch((error) => {
                logger.error("catch");
                logger.error(error);
                res.status(500).send({ status: 500, message: err })
            })
    }
})

router.get('/:id', (req, res) => {
    if (req.params.id) {
        Registration.getById(req.params.id)
            .then((registration) =>
                res.status(200).send({ status: 200, registration }))
            .catch((error) =>
                res.status(500).send({ status: 500, message: err }))
    }
    else {
        Registration.getAll(req.params.id)
            .then((registration) =>
                res.status(200).send({ status: 200, registration }))
            .catch((error) =>
                res.status(500).send({ status: 500, message: err }))
    }

})

module.exports = router;
