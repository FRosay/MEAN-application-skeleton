
const mongoose = require('mongoose');
process.env.NODE_ENV = 'test';
const server = require('../bin/www')

before((done) => {    
    var collectionsNames = Object.keys(mongoose.connection.collections)
    if (collectionsNames.length && collectionsNames.length > 0) {
        for (let collectionName of collectionsNames) {
            var collection = mongoose.connection.collections[collectionName];
            collection.drop();
        }
    }
    done();
})

after((done) => {
    mongoose.connection.close((err) => {
        done(err);
        process.exit();
    });
})