const Registration = require("..//model/registration/controller")
const logger = require("../logger")
const moment = require("moment")
const schedule = require("node-schedule")

function nextSaturday () {
    return moment().set({
        weekday: 6,
        hour: 14,
        minutes: 0,
        seconds: 0
    })
}

function createWeeklyRegistration () {
    return new Promise((resolve, reject) => {
        Registration.getNext()
            .then((registration) => {
                const date = nextSaturday()
                const endDate = moment(date).add(2, "hours")
                const limitRegistrationDate = moment(date).subtract(3, "day")
                if (!registration || (moment(registration.date) < date && moment(registration.date).diff(date, "hour") > 1)) {
                    const registrationNew = {
                        date,
                        end_date: endDate,
                        registration_limit_date: limitRegistrationDate
                    }
                    resolve(Registration.create(registrationNew))
                }
            })
            .catch((error) => {
                logger.error(error)
                reject(error)
            })
    })
}

const jobList = [createWeeklyRegistration]

function exectureJobs () {
    jobList.forEach((job) => {
        job()
    })
}

module.exports = {
    start: () => {
        exectureJobs()
        schedule.scheduleJob("*/1 * * * *", () => {
            exectureJobs()
        })
    },
    createWeeklyRegistration
}
