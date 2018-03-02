const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    created_at: { type: Date, required: true, default: Date.now },
    end_at: {type: Date, required: true },
    date: {type: Date, required: true},
    participants: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    not_participants: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    waiting_for_other: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Registration', schema);