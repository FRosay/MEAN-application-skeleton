const express = require("express")
const router = express.Router()
const registration = require("./registration/registration")

router.use("/registration", registration)

module.exports = router
