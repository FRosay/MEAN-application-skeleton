const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    created_at: { type: Date, required: true, default: Date.now },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

module.exports = mongoose.model('Registration', schema);