const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: 'string',
    created_at    : { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('User', schema);