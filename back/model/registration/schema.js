const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    created_at: { type: Date, required: true, default: Date.now },
    end_at: { type: Date, required: true },
    date: { type: Date, required: true },
    participants: [{ type: String }],
    not_participants: [{ type: String }],
    uncertains: [{ type: String }]
})
module.exports = mongoose.model("Registration", schema)
