process.env.NODE_ENV = 'test';
const server = require('../../../bin/www')

const requestSender = require("../request_sender");
const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const moment = require('moment');
const Registration = mongoose.model('Registration');

describe("Testing Registrations", () => {
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

    describe("Testing registrations creation", () => {

        it("send a valid post request to create a registration", (done) => {
            requestSender.createPost("/api/registration/new", {
                registration:
                    {
                        end_at: moment("03-03-2018", "MM-DD-YYYY").toDate(),
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

        it("try to register a user for both participate and not participate", (done) => {
            const registration = new Registration({
                participants: [user1],
                not_participants: []
            });
            ((err) => {

            })

            registration.save((err) => new Promise((resolve, reject) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve();
                }
            })
                .then(() => {
                    requestSender.createPost("/api/registration/update", {
                        registration
                    })
                })
                .then((response) => {
                    expect(response.status).to.be.eql(400);
                    expect(response.error.message).to.be.eql("USER_PARTICIPATE_AND_NOT_PARTIPATE")
                    expect(response.registration._id).to.not.eql(undefined);
                    done();
                })
                .catch((error) => done(error));
        });

        it("send a valid get request to retreive registrations", (done) => {
            requestSender.createGet("/api/registration/all")
                .then((response) => {
                    expect(response.status).be.eql(200);
                    expect(response.registrations).lengthOf(1);

                    const registration = response.registrations[0];
                    expect(registration.created_at).not.to.be.null;
                    expect(registration._id).to.not.be.null;
                    done();
                })
                .catch((error) => done(error));
        })
    });
});
