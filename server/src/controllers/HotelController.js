

const hotelModel = require("../models/HotelModel");
const hotelsModel = require("../models/HotelModel")


//Create Hotel

exports.CreateHotel = async (req, res) => {
    try {

        const { hotelName, type, city, address, distance, title, desc,
            cheapestPrice, photos, rooms, featured } = req.body // take only required data for req.body

        let newHotel = new hotelsModel({
            hotelName,
            type,
            city,
            address,
            distance,
            title,
            desc,
            cheapestPrice,
            photos,
            rooms,
            featured,

        })

        let result = await newHotel.save();

        res.status(200).json({ status: "Success", data: result })
        //res.send({ Success: "Hotel Created Successfully" })

    }


    catch (error) {
        res.status(200).json({ status: "Fail", data: error })

    }
}

//UPDATE HOTEL

exports.UpdateHotel = async (req, res) => {

    try {

        let updateHotel = await hotelsModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })

        res.status(200).json({ status: "Success", data: updateHotel })
    }
    // {new: true} means: return the updated version of previous Document

    catch (error) {
        res.status(200).json({ status: "Fail", data: error })
    }

}

// Delete Hotel
exports.DeleteHotel = async (req, res) => {

    try {

        //Don't Return anything only delete hotel (that why deleteHotel(67line) is not use)

        let deleteHotel = await hotelsModel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been Deleted")
    }

    catch (error) {
        res.status(200).json({ status: "Fail", data: error })
    }

}

//show hotel by ID

exports.ShowHotelById = async (req, res) => {

    try {


        let result = await hotelsModel.findById(req.params.id)
        res.status(200).json({ status: "Success", data: result })
    }

    catch (error) {
        res.status(200).json({ status: "Fail", data: error })
    }

}


// Show All Hotel


exports.ShowAllHotel = async (req, res) => {

    try {

        //let result = await hotelsModel.findById("hdhhd") [this line for check {catch(error)} parameter error]

        let result = await hotelsModel.find()
        res.status(200).json({ status: "Success", data: result }) // data: result, this result show data in postman
    }

    catch (error) {
        res.status(200).json({ status: "Fail", data: error })
    }

}


// Count By City

exports.CountByCity = async (req, res) => {

    // transform an array from string using Split
    const citys = req.query.cities.split(",")  // use cities as query (?) parameter 

    try {
        const list = await Promise.all(citys.map(singleCity => {
            return hotelsModel.countDocuments({ city: singleCity })
            //return hotelsModel.find({city:singleCity}).length // if use find then show all property
        }))

        //res.status(200).json({ status: "Success", data: list })
        res.status(200).json(list)
    }

    catch (error) {
        res.status(200).json({ status: "Fail", data: error })
    }


}


// Count By Type
exports.CountByType = async (req, res) => {

    try {
        const hotelCount = await hotelModel.countDocuments({ type: "Hotel" });
        const apartmentCount = await hotelModel.countDocuments({ type: "apartment" });
        const resortCount = await hotelModel.countDocuments({ type: "resort" });
        const villaCount = await hotelModel.countDocuments({ type: "villa" });
        const cabinCount = await hotelModel.countDocuments({ type: "cabin" });

        res.status(200).json([

            { type: "Hotel", count: hotelCount },
            { type: "apartments", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "villas", count: villaCount },
            { type: "cabins", count: cabinCount },
        ])
    }

    catch (error) {
        res.status(200).json({ status: "Fail", data: error })
    }


}

