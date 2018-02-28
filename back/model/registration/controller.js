RegistrationSchema = require('./schema');

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

    update(registration) {
        return new Promise((resolve, reject) => {
            RegistrationSchema.findById(registration._id, (err, registrationObj) => {
                registrationObj.set(registration);
                registrationObj.save((err, updatedRegistration) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(updatedRegistration);
                    }
                })
            })
        })
    }

    validate(registration) {
        return new Promise((resolve, reject) => {
            const registration_obj = mongoose.model('Registration').find(registration, (err, registration_obj) => {
                if (err) {
                    return reject(err);
                } else {
                    validationRules.forEach((rule) => {
                        const error = rule(registration_obj).error
                        if (error) {
                            reject(error)
                        }
                    })
                }
            });
        });
    }
}

validationRules = [
    (registration) => {
        //A user can't be both not participating and participating
        if (true) {
            return {
                error: "USER_PARTICIPATE_AND_NOT_PARTIPATE"
            }
        }
    }
]

module.exports = new RegistrationController();