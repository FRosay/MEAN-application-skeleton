const request = require('request');
class TestHttpSender {

    static createPost(url, body) {
        return new Promise((resolve, reject) => {
            request({
                url: "http://localhost:3000" + url,
                method: "POST",
                json: body
            }, (error, response, body) => {
                if (response.statusCode === 200) {
                    return resolve(body)
                }
                else {
                    return reject(error || "An error has happened")
                }
            })
        })
    }

    static createGet(url) {

        return new Promise((resolve, reject) => {
            request({
                url: "http://localhost:3000" + url,
                method: "GET",
            }, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    try {
                        body = JSON.parse(body);
                        resolve(body);
                    } catch (error) {
                        resolve(body);
                    }
                }
                else {
                    reject(error)
                }
            })
        })
    }

}

function createRequest(url) {

}

module.exports = TestHttpSender;