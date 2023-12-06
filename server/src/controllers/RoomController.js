const roomsModel = require("../models/RoomModel")
const hotelsModel = require("../models/HotelModel")


// Create Room

exports.CreateRoom = async (req, res) => {

    const hotelId = req.params.hotelid  // unique id of hotel goes to parameter when need to room create
    const { title, price, maxPeople, desc, roomNumbers } = req.body

    let newRoom = new roomsModel({
        title,
        price,
        maxPeople,
        desc,
        roomNumbers

    })

    try {
        const savedRoom = await newRoom.save();

        try {

            await hotelsModel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } }) // unique room id from room creation, push to hotel Model under rooms(database field) Array  [{rooms:savedRoom_.id}, here _rooms_ comes from hotel Model

        }

        catch (error) {
            res.status(200).json({ status: "Fail", data: "Can not push roomid in hotel" })
        }

        res.status(200).json({ status: "Success", data: savedRoom })
    }

    catch (error) {
        res.status(200).json({ status: "Fail", data: error })

    }

}


//UPDATE ROOM

exports.UpdateRoom = async (req, res) => {

    try {

        let updateRoom = await roomsModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })


        res.status(200).json({ status: "Success", data: updateRoom })
    }
    // {new: true} means: return the updated version of previous Document

    catch (error) {
        res.status(200).json({ status: "Fail", data: error })
    }

}

// Delete Room

exports.DeleteRoom = async (req, res) => {

    const hotelId = req.params.hotelid

    try {

        let deleteRoom = await roomsModel.findByIdAndDelete(req.params.id)

        try {

            await hotelsModel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } })

        }

        catch (error) {
            res.status(200).json({ status: "Fail", data: "ID Don't Deleted from hotel model" })

        }
        res.status(200).json("Room Has Been Deleted")

    }

    catch (error) {
        res.status(200).json({ status: "Fail", data: error })
    }

}

//show Room by ID

exports.ShowRoomById = async (req, res) => {

    try {


        let result = await roomsModel.findById(req.params.id)
        res.status(200).json({ status: "Success", data: result })
    }

    catch (error) {
        res.status(200).json({ status: "Fail", data: error })
    }

}

exports.ShowAllRoom = async (req, res) => {

    try {

        let result = await roomsModel.find()
        res.status(200).json({ status: "Success", data: result }) // data: result, this result show data in postman
    }

    catch (error) {
        res.status(200).json({ status: "Fail", data: error })
    }

}
