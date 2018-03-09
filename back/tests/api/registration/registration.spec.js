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
                done(err);
            }
            const User = mongoose.model('User')
            user1 = new User({ name: "user1" });
            user2 = new User({ name: "user2" })
            user3 = new User({ name: "user2" })
            user1.save()
                .then(() => user2.save())
                .then(() => user3.save())
                .then(() => done());
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

        it("send /api/registration/new with an invalid registration (breaking rules)", (done) => {
            requestSender.createPost("/api/registration/new", {
                registration:
                    {
                        end_at: moment("03-03-2018", "MM-DD-YYYY").toDate(),
                        participants: [user1],
                        not_participants: [user1]
                    }
            })
                .then((response) => {
                    done("should have failed");
                })
                .catch((error) => {
                    expect(error).to.be.eql("USER_PARTICIPATE_AND_NOT_PARTIPATE");
                    done();
                });
        });

        it("send /api/registration/new with no registration", (done) => {
            requestSender.createPost("/api/registration/new", {})
                .then((response) => {
                    done("should have failed");
                })
                .catch((error) => {
                    expect(error).to.be.eql("NO_REGISTRATION");
                    done();
                });
        });
    });

    describe("updates", (done) => {

        it("post /api/registration/update", (done) => {
            const registration = new Registration({
                participants: [],
                not_participants: [],
                end_at: moment().toDate(),
                date: moment().toDate()
            });
            registration.save()
                .then((registrationObj) => new Promise((resolve, reject) => {
                    registrationObj.participants.push(user1);
                    return resolve(registrationObj);
                }))
                .then((registrationObj) => requestSender.createPut("/api/registration/update", { registration: registrationObj }))
                .then((response) => {
                    expect(response.status).to.be.eql(200);
                    expect(response.registration.participants).to.have.lengthOf(1);
                    done();
                })
                .catch(done);
        });

        it("post /api/registration/update with no registration", (done) => {
            requestSender.createPut("/api/registration/update", {})
                .then((response) => {
                    done("should have failed");
                })
                .catch((error) => {
                    expect(error).to.be.eql("NO_REGISTRATION");
                    done();
                });
        });

        it("post /api/registration/update with a user both participating and not participating", (done) => {
            const registration = new Registration({
                participants: [],
                not_participants: [],
                date: moment().toDate(),
                end_at: moment().toDate()
            });
            registration.save()
                .then((registrationObj) => new Promise((resolve, reject) => {
                    registrationObj.participants.push(user1);
                    registrationObj.not_participants.push(user1);
                    return resolve(registrationObj);
                }))
                .then((registrationObj) => requestSender.createPut("/api/registration/update", { registration: registrationObj }))
                .then((response) => {
                    done("should have failed");
                })
                .catch((error) => {
                    expect(error).to.be.eql("USER_PARTICIPATE_AND_NOT_PARTIPATE");
                    done();
                });
        });

        it("post /api/registration/update with a date inferior to end_at", (done) => {
            const registration = new Registration({
                participants: [],
                not_participants: [],
                date: moment().subtract(1, "day").toDate(),
                end_at: moment().toDate()
            });
            registration.save()
                .then((registrationObj) => new Promise((resolve, reject) => {
                    return resolve(registrationObj);
                }))
                .then((registrationObj) => requestSender.createPut("/api/registration/update", { registration: registrationObj }))
                .then((response) => {
                    done("should have failed");
                })
                .catch((error) => {
                    expect(error).to.be.eql("REGISTRATION_ENDAT_CANNOT_BE_SUPERIOR_TO_REGISTRATION_DATE");
                    done();
                });
        });
    })

    describe('retreiving all registration', (done) => {


        it("get /api/registration/all", (done) => {
            before((done) => {
                let registration1 = new Registration({
                    participants: [],
                    not_participants: [],
                    date: moment().toDate(),
                    end_at: moment().toDate()
                }),
                registration2 = new Registration({
                    participants: [],
                    not_participants: [],
                    date: moment().toDate(),
                    end_at: moment().toDate()
                })
                ,registration3 = new Registration({
                    participants: [],
                    not_participants: [],
                    date: moment().toDate(),
                    end_at: moment().toDate()
                });
                Registration.remove({})
                .then(() => registration1.save())
                .then(() => registration2.save())
                .then(() => registration3.save())
                .catch(done);
            })

            requestSender.createGet("/api/registration/")
                .then((response) => {
                    expect(response.status).be.eql(200);
                    expect(response.registrations).lengthOf(3);

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

        it("get /api/registration/next", (done) => {

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

        it('get /api/registration/?id', (done) => {
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
