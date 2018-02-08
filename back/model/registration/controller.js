RegistrationSchema = require('./schema');

class RegistrationController {

    create(registration) {
        return new Promise((resolve, reject) => {
            new RegistrationSchema(registration).save((err, registration_saved) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(registration_saved)
                }
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
}

module.exports = new RegistrationController();