const express = require("express")


const roomControllers = require("../controllers/RoomController")
const { VerifyAdmin } = require("../middleware/adminVerifyMiddleware");

const router = express.Router();

// Implement All Method

// Create Room

router.post("/create-room/:hotelid", VerifyAdmin, roomControllers.CreateRoom);

// Update Room
router.put("/update-room/:id", VerifyAdmin, roomControllers.UpdateRoom);

// Delete Room
router.delete("/delete-room/:id/:hotelid", VerifyAdmin, roomControllers.DeleteRoom);

//show Room by ID
router.get("/show-room-by-id/:id", roomControllers.ShowRoomById);

//show All Room 

router.get("/show-all-room", roomControllers.ShowAllRoom);


module.exports = router;