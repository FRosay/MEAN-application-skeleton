process.env.NODE_ENV = "test"
const server = require("../../../bin/www")// eslint-disable-line no-unused-vars
const requestSender = require("../request_sender")
const chai = require("chai")
const expect = chai.expect
const moment = require("moment")
const async = require("async")
const Registration = require("../../../model/registration/schema")
const mongoose = require("mongoose")

describe("Registrations", () => {
    before((done) => {
        mongoose.model("Registration").remove([], () => {
            console.log("remove")
            done()
        })
    })

    describe("creation ", () => {
        it("send /api/registration/new", (done) => {
            requestSender.createPost("/api/registration/new", {
                registration:
                    {
                        end_date: moment("03-03-2018", "MM-DD-YYYY").toDate(),
                        date: moment("03-03-2018", "MM-DD-YYYY").toDate(),
                        registration_limit_date: moment("03-03-2018", "MM-DD-YYYY").subtract(1, "day").toDate(),
                        participants: ["user1"],
                        waiting_for_other: "user2",
                        not_participants: ["user3"]
                    }
            })
                .then((response) => {
                    expect(response.status).to.be.eql(200)
                    expect(response.registration._id).to.not.eql(undefined)
                    done()
                })
                .catch((error) => done(error))
        })

        it("send /api/registration/new with an invalid registration (breaking rules)", (done) => {
            requestSender.createPost("/api/registration/new", {
                registration:
                    {
                        registration_limit_date: moment("03-03-2018", "MM-DD-YYYY").subtract(1, "day").toDate(),
                        end_date: moment("03-03-2018", "MM-DD-YYYY").toDate(),
                        participants: ["user1"],
                        not_participants: ["user1"]
                    }
            })
                .then((response) => {
                    done("should have failed")
                })
                .catch((error) => {
                    expect(error).to.be.eql("A user cannot be both in participants, not_participants and waiting_for_others")
                    done()
                })
        })

        it("send /api/registration/new with no registration", (done) => {
            requestSender.createPost("/api/registration/new", {})
                .then((response) => {
                    done("should have failed")
                })
                .catch((error) => {
                    expect(error).to.be.eql("no registration provided")
                    done()
                })
        })
    })

    describe("updates", (done) => {
        it("post /api/registration/update", (done) => {
            const registration = new Registration({
                participants: [],
                not_participants: [],
                registration_limit_date: moment().subtract(1, "day").toDate(),
                end_date: moment().toDate(),
                date: moment().toDate()
            })
            registration.save()
                .then((registrationObj) => new Promise((resolve, reject) => {
                    registrationObj.participants.push("user1")
                    return resolve(registrationObj)
                }))
                .then((registrationObj) => requestSender.createPut("/api/registration/update", { registration: registrationObj }))
                .then((response) => {
                    expect(response.status).to.be.eql(200)
                    expect(response.registration.participants).to.have.lengthOf(1)
                    done()
                })
                .catch(done)
        })

        it("post /api/registration/update with no registration", (done) => {
            requestSender.createPut("/api/registration/update", {})
                .then((response) => {
                    done("should have failed")
                })
                .catch((error) => {
                    expect(error).to.be.eql("can't find registration")
                    done()
                })
        })

        it("post /api/registration/update with a user both participating and not participating", (done) => {
            const registration = new Registration({
                participants: [],
                not_participants: [],
                date: moment().toDate(),
                end_date: moment().toDate(),
                registration_limit_date: moment().subtract(1, "day").toDate()
            })
            registration.save()
                .then((registrationObj) => new Promise((resolve, reject) => {
                    registrationObj.participants.push("user1")
                    registrationObj.not_participants.push("user1")
                    return resolve(registrationObj)
                }))
                .then((registrationObj) => requestSender.createPut("/api/registration/update", { registration: registrationObj }))
                .then((response) => {
                    done("should have failed")
                })
                .catch((error) => {
                    expect(error).to.be.eql("A user cannot be both in participants, not_participants and waiting_for_others")
                    done()
                })
        })

        it("post /api/registration/update with a date superior to end date", (done) => {
            const registration = new Registration({
                date: moment().add(1, "day").toDate(),
                end_date: moment().toDate(),
                registration_limit_date: moment().subtract(1, "hour").toDate()
            })
            registration.save()
                .then((registrationObj) => requestSender.createPut("/api/registration/update", { registration: registrationObj }))
                .then((response) => {
                    done("should have failed")
                })
                .catch((error) => {
                    expect(error).to.be.eql("date cannot be superior to end_date")
                    done()
                })
        })

        it("post /api/registration/update with a date inferior to registration_limit_date", (done) => {
            const registration = new Registration({
                participants: [],
                not_participants: [],
                date: moment().toDate(),
                end_date: moment().add(1, "hour").toDate(),
                registration_limit_date: moment().add(1, "day").toDate()

            })
            registration.save()
                .then((registrationObj) => new Promise((resolve, reject) => {
                    return resolve(registrationObj)
                }))
                .then((registrationObj) => requestSender.createPut("/api/registration/update", { registration: registrationObj }))
                .then((response) => {
                    done("should have failed")
                })
                .catch((error) => {
                    expect(error).to.be.eql("registration limit date cannot be superior to date")
                    done()
                })
        })
    })

    describe("retreiving all registration", (done) => {
        it("get /api/registration/all", (done) => {
            before((done) => {
                let registration1 = new Registration({
                    participants: [],
                    not_participants: [],
                    date: moment().toDate(),
                    end_date: moment().add(1, "hour").toDate(),
                    registration_limit_date: moment().subtract(1, "day").toDate()
                })
                let registration2 = new Registration({
                    participants: [],
                    not_participants: [],
                    date: moment().toDate(),
                    end_date: moment().add(1, "hour").toDate(),
                    registration_limit_date: moment().subtract(1, "day").toDate()
                })
                let registration3 = new Registration({
                    participants: [],
                    not_participants: [],
                    date: moment().toDate(),
                    end_date: moment().add(1, "hour").toDate(),
                    registration_limit_date: moment().subtract(1, "day").toDate()
                })
                Registration.remove({})
                    .then(() => registration1.save())
                    .then(() => registration2.save())
                    .then(() => registration3.save())
                    .catch(done)
            })

            requestSender.createGet("/api/registration/")
                .then((response) => {
                    expect(response.status).be.eql(200)
                    expect(response.registrations).lengthOf(3)

                    const registration = response.registrations[0]
                    expect(registration.created_at).not.to.eql(null)
                    expect(registration._id).to.not.eql(null)
                    done()
                })
                .catch((error) => done(error))
        })
    })

    describe("retreiving the next registration", (done) => {
        let registration1, registration2, registration3

        before((done) => {
            async.waterfall([
                (next) => Registration.remove({}, () => next()),
                (next) => {
                    registration1 = new Registration({
                        end_date: moment().add(3, "day").toDate(),
                        registration_limit_date: moment().add(1, "day").toDate(),
                        date: moment().add(2, "day").toDate()
                    })
                    registration2 = new Registration({
                        end_date: moment().add(2, "day").toDate(),
                        registration_limit_date: moment().toDate(),
                        date: moment().add(1, "day").toDate()
                    })
                    registration3 = new Registration({
                        end_date: moment().add(4, "day").toDate(),
                        registration_limit_date: moment().add(2, "day").toDate(),
                        date: moment().add(3, "day").toDate()
                    })
                    async.parallel([
                        (next) => registration1.save(next),
                        (next) => registration2.save(next),
                        (next) => registration3.save(next)
                    ], next)
                }], (err) => done(err))
        })

        it("get /api/registration/next", (done) => {
            requestSender.createGet("/api/registration/next")
                .then((response) => {
                    expect(response.status).be.eql(200)
                    const registration = response.registration
                    expect(moment(registration.date).toDate()).to.be.eql(registration2.date)
                    done()
                })
                .catch((error) => done(error))
        })
    })

    describe("retreiving registration by id", (done) => {
        let registration1
        before((done) => {
            async.waterfall([
                (next) => Registration.remove({}, () => next()),
                (next) => {
                    const registration = new Registration({
                        end_date: moment().add(1, "hour").toDate(),
                        registration_limit_date: moment().subtract(1, "day").toDate(),
                        date: moment()
                    })
                    registration.save((err, savedRegistration) => {
                        if (err) {
                            return next(err)
                        }
                        registration1 = savedRegistration
                        return next()
                    })
                },
                (next) => {
                    const registration = new Registration({
                        end_date: moment().add(1, "hour").toDate(),
                        registration_limit_date: moment().subtract(1, "day").toDate(),
                        date: moment()
                    })

                    registration.save((err, savedRegistration) => {
                        if (err) {
                            return next(err)
                        }
                        return next()
                    })
                }
            ], (err) => done(err))
        })

        it("get /api/registration/?id", (done) => {
            requestSender.createGet("/api/registration/?id" + registration1._id)
                .then((response) => {
                    expect(response.status).be.eql(200)
                    expect(response.registrations).lengthOf(1)

                    const registration = response.registration
                    expect(registration._id).to.be.eql(registration1._id)
                    done()
                })
                .catch((error) => done(error))
        })
    })
})
