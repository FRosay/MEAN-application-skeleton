const RegistrationSchema = require('./schema');
const moment = require('moment');
const logger = require('../../logger');
const rules = require('./rules');

class RegistrationController {

    create(registration) {
        return new Promise((resolve, reject) => {
            const registrationObj = new RegistrationSchema(registration);
            console.log(registrationObj);
            this.validate(registrationObj)
            .then(() => registrationObj.save())
            .then((registrationSaved) => resolve(registrationSaved))
            .catch((error) => reject(error));
        })
    }

    getAll() {
        return RegistrationSchema.find({}, (err, users));
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            if (!id) {
                return reject('no regestration id given');
            }
            return RegistrationSchema.find({ _id: id });
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
                if (!registrationObj) {
                    return reject("can't find registration : "+ JSON.stringify(registration));
                }
                registrationObj.set(registration);
                return this.validate(registrationObj)
                    .then(() => registrationObj.save())
                    .then((registration) => resolve(registration))
                    .catch((error) => {
                        reject(error)
                    })
            })
        })
    }

    validate(registration) {
        return Promise.all(rules.map((rule) => rule(registration)))
    }
}

module.exports = new RegistrationController();