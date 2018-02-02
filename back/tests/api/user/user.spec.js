const requestSender = require("../request_sender");
const chai = require('chai');
const expect = chai.expect;

describe("Testing Users", () => {

    describe("Testing Users creation",() => {

        it ("send a valid post request to create a user", (done) => {
            requestSender.createPost("/api/user/new", {user : {name: "Jim"}})
                .then((response) => {
                    expect(response.status).to.be.eql(200);
                    done()
                })
                .catch((error) => done(error));
        });

    });
});
