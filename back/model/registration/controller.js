const RegistrationSchema = require('./schema');
const moment = require('moment');
const logger = require('../../logger');

class RegistrationController {

    create(registration) {
        return new Promise((resolve, reject) => {
            new RegistrationSchema(registration).save((err, registration_saved) => {
                if (err) {
                    return reject(err);
                }
                return resolve(registration_saved);
            })
        })
    }

    getAll() {
        return new Promise((resolve, reject) => {
            RegistrationSchema.find({}, (err, users) => {
                if (err) {
                    return reject(err);
                }
                return resolve(users);
            })
        })
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            if (!id) {
                return reject('no regestration id given');
            }
            RegistrationSchema.find({ _id: id }, (err, users) => {
                if (err) {
                    return reject(err);
                }
                return resolve(users);
            })
        })
    }

    getNext() {
        return new Promise((resolve, reject) => {
            const now = moment().toISOString();
            RegistrationSchema
                .find({ date: { $gte: now } })
                .sort({ "date": 1 })
                .limit(1)
                .exec((err, registrations) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(registrations[0]);
                })
        });
    }

    update(registration) {
        return new Promise((resolve, reject) => {
            RegistrationSchema.findById(registration._id, (err, registrationObj) => {
                registrationObj.set(registration);
                this.validate(registrationObj)
                    .then(() => {
                        registrationObj.save((err, updatedRegistration) => {
                            if (err) {
                                return reject(err);
                            } else {
                                return resolve(updatedRegistration);
                            }
                        })
                    })
                    .catch((error) => {
                        return reject(error);
                    })
            })
        })
    }

    validate(registration) {
        return new Promise((resolve, reject) => {
            async.parallel(
                validationRules.map((rule) => {
                    (next) => rule(registration, next)
                }), (err) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve();
                    }
                }
            )
        });
    }
}

validationRules = [
    function cantParticipateAndNotParticipate(registration, next) {
        console.log("registration", registration);
        //A user is both in participants and not_participants
        if (registration.participants.some((participant) =>
            registration.not_participants.some((not_participant) => {
                return not_participant.toString() === participant.toString();
            })
        )) {
            return next("USER_PARTICIPATE_AND_NOT_PARTIPATE");
        }
        return next();
    }
]

module.exports = new RegistrationController();