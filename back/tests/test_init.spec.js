const mongoose = require('mongoose');

before(function (done) {
    this.timeout(10000);

    console.log("cleaning database");
    var collectionsNames = Object.keys(mongoose.connection.collections)
    if (collectionsNames.length && collectionsNames.length > 0) {
        collectionsNames.forEach((collectionName, done) => {
            var collection = mongoose.connection.collections[collectionName];
            collection.drop(function (err) {
                if (err) {
                    return done(err);
                }
            })
        }, () => {
            done();
        })
    } else {
        done();
    }
})

after(() => {
    mongoose.connection.close((err) => {
        if (err) {
            done(err);
        }
        console.log("closing database connection");
    })
})