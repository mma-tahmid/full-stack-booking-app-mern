const express = require("express")



const hotelControllers = require("../controllers/HotelController");
const { VerifyAdmin } = require("../middleware/adminVerifyMiddleware");

const router = express.Router();

// Implement All Method

router.post("/create-hotel", VerifyAdmin, hotelControllers.CreateHotel);

// Update hotel
router.put("/update-hotel/:id", VerifyAdmin, hotelControllers.UpdateHotel);

// Delete hotel
router.delete("/delete-hotel/:id", VerifyAdmin, hotelControllers.DeleteHotel);

//show hotel by ID
router.get("/show-hotel-by-id/:id", hotelControllers.ShowHotelById);

//show All hotel 

router.get("/show-all-hotel", hotelControllers.ShowAllHotel);


module.exports = router; 