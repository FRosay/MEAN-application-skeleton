const moment = require("moment")

module.exports = [
    function cantBothParticipateAndNotParticipate (registration) {
        return new Promise((resolve, reject) => {
            if (registration.participants.some((participant) =>
                registration.not_participants.some((notParticipant) => {
                    return notParticipant.toString() === participant.toString() && participant.toString !== registration.waiting_for_other
                })
            )) {
                return reject(new Error("USER_PARTICIPATE_AND_NOT_PARTIPATE"))
            }
            return resolve()
        })
    },
    function dateCannotBeSuperiorToEndAt (registration) {
        return new Promise((resolve, reject) => {
            if (moment(registration.date) >= moment(registration.end_at)) {
                return resolve()
            }
            return reject(new Error("REGISTRATION_ENDAT_CANNOT_BE_SUPERIOR_TO_REGISTRATION_DATE"))
        })
    }
]
