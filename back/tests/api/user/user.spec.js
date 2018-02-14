process.env.NODE_ENV = 'test';
const server = require('../../../bin/www')

const requestSender = require("../request_sender");
const chai = require('chai');
const expect = chai.expect;
const mongoose = require("mongoose");
const logger = require('../../../logger');
describe("Testing Users", () => {

    before((done) => {
        mongoose.model('User').remove({}, (err) => {
            logger.error(err);
            return done(err);
        });
    });

    describe("Testing Users creation", () => {

        it("send a valid post request to create a user", (done) => {
            requestSender.createPost("/api/user/new", { user: { name: "Jim" } })
                .then((response) => {
                    expect(response.status).to.be.eql(200);
                    expect(response.user._id).to.not.eql(undefined);
                    done();
                })
                .catch((error) => {
                    logger.error(error);
                    done(error);
                });
        });

        it("send a valid get request to retreive users", (done) => {
            requestSender.createGet("/api/user/all")
                .then((response) => {
                    expect(response.status).be.eql(200);
                    expect(response.users).lengthOf(1);

                    const user = response.users[0];
                    expect(user.name).to.eql("Jim");
                    expect(user._id).to.not.be.null;
                    done();
                })
                .catch((error) => {
                    logger.error(error);
                    done(error)
                });
        })
    });
});
