const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
    candidate: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // This assumes you have a User model
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Ensure that a user can only vote once
voteSchema.index({ user: 1 }, { unique: true });

module.exports = mongoose.model("Vote", voteSchema);
