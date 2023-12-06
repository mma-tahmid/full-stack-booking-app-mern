// Schema

const mongoose = require("mongoose")

const roomSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        price: { type: Number, required: true },
        maxPeople: { type: Number, required: true },
        desc: { type: String, required: true },
        roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
    },

    { timestamps: true, versionKey: false }
);

// model
const roomModel = mongoose.model("rooms", roomSchema);
module.exports = roomModel;



