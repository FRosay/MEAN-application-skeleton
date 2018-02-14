UserSchema = require('./schema');

class UserController {

    create(user) {
        return new Promise((resolve, reject) => {
            new UserSchema(user).save(user, (err, user_saved) => {
                if (err) {
                    return reject(err);
                }
                return resolve(user_saved)
            });
        })
    }

    getAll() {
        return new Promise((resolve, reject) => {
            UserSchema.find({}, (err, users) => {
                if (err) {
                    return reject(err);
                }
                return resolve(users);
            })
        })
    }
}

module.exports = new UserController();