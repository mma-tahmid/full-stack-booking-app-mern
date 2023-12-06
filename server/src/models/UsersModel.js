// Schema

const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        userName: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        //country: { type: String, required: true },
        //img: { type: String },
        // city: { type: String, required: true },
        // phone: { type: String, required: true },
        isAdmin: { type: Boolean, default: false },
    },
    { timestamps: true, versionKey: false }
);

// model
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;

