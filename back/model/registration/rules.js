module.exports = [
    function cantBothParticipateAndNotParticipate(registration) {
        return new Promise((resolve, reject) => {
            if (registration.participants.some((participant) =>
                registration.not_participants.some((not_participant) => {
                    return not_participant.toString() === participant.toString();
                })
            )) {
                return reject("USER_PARTICIPATE_AND_NOT_PARTIPATE");
            }
            return resolve();
        })
    }]
