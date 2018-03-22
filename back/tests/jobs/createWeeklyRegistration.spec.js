process.env.NODE_ENV = "test"
const server = require("../../bin/www")// eslint-disable-line no-unused-vars
const chai = require("chai")
const expect = chai.expect
const moment = require("moment")
const Registration = require("../../model/registration/controller")
const mongoose = require("mongoose")
const Jobs = require("../../jobs/jobs")
describe("Jobs", () => {
    before((done) => {
        mongoose.model("Registration").remove([], () => {
            done()
        })
    })

    describe("creation", () => {
        it("create a weekly reservation for saturday 2pm", (done) => {
            Jobs.createWeeklyRegistration()
                .then(() => Registration.getNext())
                .then((registration) => {
                    expect(moment(registration.date).toString())
                        .to.be.eql(
                            moment().set({
                                weekday: 6,
                                hour: 14,
                                minutes: 0,
                                seconds: 0
                            })
                                .toString())
                    expect(moment(registration.end_date).toString())
                        .to.be.eql(
                            moment().set({
                                weekday: 6,
                                hour: 16,
                                minutes: 0,
                                seconds: 0
                            })
                                .toString())
                    expect(moment(registration.registration_limit_date).toString())
                        .to.be.eql(
                            moment().set({
                                weekday: 3,
                                hour: 14,
                                minutes: 0,
                                seconds: 0
                            })
                                .toString())
                    done()
                })
        })
    })
})
