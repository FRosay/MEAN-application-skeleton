const Registration = require("..//model/registration/controller")
const logger = require("../logger")
const moment = require("moment")
const schedule = require("node-schedule")

function nextSaturday () {
    return moment().set({
        weekday: 6,
        hour: 14,
        minutes: 0
    })
}

const jobList = [function createWeeklyRegistration () {
    Registration.getNext()
        .then((registration) => {
            const date = nextSaturday()
            if (!registration || (moment(registration.date) < date && moment(registration.date).diff(date, "hour") > 1)) {
                const registrationNew = {
                    date,
                    end_at: date
                }
                return Registration.create(registrationNew)
            }
        })
        .catch((error) => {
            logger.error(error)
        })
}]

function exectureJobs () {
    jobList.forEach((job) => {
        job()
    })
}

module.exports = {
    getList: () => jobList,
    start: () => {
        exectureJobs()
        schedule.scheduleJob("*/1 * * * *", () => {
            exectureJobs()
        })
    }
}
