const moment = require("moment")

module.exports = [
    function cantBothParticipateAndNotParticipate (registration) {
        return new Promise((resolve, reject) => {
            if (registration.participants.some((participant) =>
                registration.not_participants.some((notParticipant) => {
                    return notParticipant.toString() === participant.toString() && participant.toString !== registration.waiting_for_other
                })
            )) {
                return reject(new Error("A user cannot be both in participants, not_participants and waiting_for_others"))
            }
            return resolve()
        })
    },
    function registrationLimitDateCannotBeSuperioToDate (registration) {
        return new Promise((resolve, reject) => {
            if (moment(registration.date) >= moment(registration.registration_limit_date)) {
                return resolve()
            }
            return reject(new Error("registration limit date cannot be superior to date"))
        })
    },
    function dateCannotBeSuperiorToEndDate (registration) {
        return new Promise((resolve, reject) => {
            if (moment(registration.date) <= moment(registration.end_date)) {
                return resolve()
            }
            return reject(new Error("date cannot be superior to end_date"))
        })
    }
]
