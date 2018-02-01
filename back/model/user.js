UserSchema = require('./schema');

class User {

    create(user) {
        return new Promise((resolve, reject) => {
            const new_user = new UserSchema(user);
            new_user.save((err) => {
                if (err) {
                    return reject(err);
                } else {
                    resolve(new_user)
                }
            });
        })
    }
}

module.exports = new User();