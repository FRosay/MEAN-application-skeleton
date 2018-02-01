const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: 'string',
});

module.exports = mongoose.model('User', schema);