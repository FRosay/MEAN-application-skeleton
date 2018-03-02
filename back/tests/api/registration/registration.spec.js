process.env.NODE_ENV = 'test';
const server = require('../../../bin/www')

const requestSender = require("../request_sender");
const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const moment = require('moment');
const Registration = mongoose.model('Registration');
const async = require('async');

describe("Registrations", () => {
    let user1;
    let user2;
    let user3;
    before((done) => {
        mongoose.model('Registration').remove({}, (err) => {
            if (err) {
                logger.error(err);
            }
            const User = mongoose.model('User')
            user1 = new User({
                name: "user1"
            });
            user2 = new User({
                name: "user2"
            })
            user3 = new User({
                name: "user2"
            })

            user1.save(() => user2.save(() => user3.save(() => done())));
        });
    })

    describe("creation ", () => {

        it("send /api/registration/new", (done) => {
            requestSender.createPost("/api/registration/new", {
                registration:
                    {
                        end_at: moment("03-03-2018", "MM-DD-YYYY").toDate(),
                        date: moment("03-03-2018", "MM-DD-YYYY").toDate(),
                        participants: [user1],
                        waiting_for_other: user2,
                        not_participants: [user3]
                    }
            })
                .then((response) => {
                    expect(response.status).to.be.eql(200);
                    expect(response.registration._id).to.not.eql(undefined);
                    done();
                })
                .catch((error) => done(error));
        });
    });

    describe("updates", (done) => {
        it("post /api/registration/update", (done) => {
            const registration = new Registration({
                participants: [],
                not_participants: [],
                date: moment().toDate(),
                end_at: moment().toDate()
            });
            registration.save((err, registrationObj) => new Promise((resolve, reject) => {
                if (err) {
                    return reject(err);
                } else {
                    registrationObj.participants.push(user1);
                    return resolve(registrationObj);
                }
            })
                .then((registrationObj) => requestSender.createPost("/api/registration/update", { registration: registrationObj }))
                .then((response) => {
                    expect(response.status).to.be.eql(200);
                    expect(response.registration.participants).to.have.lengthOf(1);
                    done();
                })
                .catch((error) => {
                    console.log(error);
                    done(error)
                }));
        });

        it("post /api/registration/update with a user both participating and not participating", (done) => {

            before((done) => {
                Registration.remove({}, () => done());
            })

            const registration = new Registration({
                participants: [],
                not_participants: [],
                date: moment().toDate(),
                end_at: moment().toDate()
            });
            registration.save((err, registrationObj) => new Promise((resolve, reject) => {
                if (err) {
                    return reject(err);
                } else {
                    registrationObj.participants.push(user1);
                    registrationObj.not_participants.push(user1);
                    return resolve(registrationObj);
                }
            })
                .then((registrationObj) => requestSender.createPost("/api/registration/update", { registration: registrationObj }))
                .then((response) => {
                    expect(response.status).to.be.eql(500);
                    expect(response.error.message).to.be.eql(USER_PARTICIPATE_AND_NOT_PARTIPATE);
                    done();
                })
                .catch((error) => {
                    done(error)
                }));
        });
    })

    describe('retreiving all registration', (done) => {
        it("send a valid get request to /api/registration/all", (done) => {

            requestSender.createGet("/api/registration/")
                .then((response) => {
                    expect(response.status).be.eql(200);
                    expect(response.registrations).lengthOf(1);

                    const registration = response.registrations[0];
                    expect(registration.created_at).not.to.be.null;
                    expect(registration._id).to.not.be.null;
                    done();
                })
                .catch((error) => done(error));
        });

    });

    describe('retreiving the next registration', (done) => {
        let registration1, registration2, registration3;

        before((done) => {
            async.waterfall([
                (next) => Registration.remove({}, () => next()),
                (next) => {
                    registration1 = new Registration({
                        end_at: moment().add(2, 'day'),
                        date: moment().add(3, 'day')
                    });
                    registration2 = new Registration({
                        end_at: moment().add(1, 'day'),
                        date: moment().add(1, 'day')
                    });
                    registration3 = new Registration({
                        end_at: moment().add(1, 'day'),
                        date: moment().add(2, 'day')
                    });
                    async.parallel([
                        (next) => registration1.save(next),
                        (next) => registration2.save(next),
                        (next) => registration3.save(next)
                    ], next)
                }], (err) => done(err));
        });

        it("send a valid get request to /api/registration/next", (done) => {

            requestSender.createGet("/api/registration/next")
                .then((response) => {
                    expect(response.status).be.eql(200);
                    const registration = response.registration;
                    expect(moment(registration.date).toDate()).to.be.eql(registration2.date);
                    done();
                })
                .catch((error) => done(error));
        });
    });

    describe('retreiving registration by id', (done) => {
        let registration1, registration2, registration3;
        before((done) => {
            async.waterfall([
                (next) => Registration.remove({}, () => next()),
                (next) => {
                    const registration = new Registration({
                        end_at: moment(),
                        date: moment()
                    });
                    registration.save((err, saved_registration) => {
                        if (err) {
                            return next(err);
                        }
                        registration1 = saved_registration;
                        return next();
                    })
                },
                (next) => {
                    const registration = new Registration({
                        end_at: moment(),
                        date: moment()
                    });

                    registration.save((err, saved_registration) => {
                        if (err) {
                            return next(err);
                        }
                        registration2 = saved_registration;
                        return next();
                    })
                }
            ], (err) => done(err))
        });

        it('send a valid get request to /api/registration/?id', (done) => {
            requestSender.createGet("/api/registration/?id" + registration1._id)
                .then((response) => {
                    expect(response.status).be.eql(200);
                    expect(response.registrations).lengthOf(1);

                    const registration = response.registration;
                    expect(registration._id).to.be.eql(registration1._id);
                    done();
                })
                .catch((error) => done(error));
        })
    });
});
