process.env.NODE_ENV = 'test';
const server = require('../../../bin/www')

const requestSender = require("../request_sender");
const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');


describe("Testing Registrations", () => {

    before((done) => {
        mongoose.model('Registration').remove({}, (err) => {
            if (err) {
                logger.error(err);
            }
            return done(err);
        });
    })

    describe("Testing registrations creation", () => {

        it("send a valid post request to create a registration", (done) => {
            requestSender.createPost("/api/registration/new", { registration: { name: "Jim" } })
                .then((response) => {
                    expect(response.status).to.be.eql(200);
                    expect(response.registration._id).to.not.eql(undefined);
                    done();
                })
                .catch((error) => done(error));
        });

        it ("send a valid get request to retreive registrations", (done) => {
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
