const mongoose = require("mongoose");
// const { Polling } = require("../../frontend/polling/src/components/Polling");
// const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
module.exports = mongoose.model("User", UserSchema);
