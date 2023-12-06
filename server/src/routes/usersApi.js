const express = require("express")

// All require code is Here
const usersController = require("../controllers/UsersController");
const { VerifyToken } = require("../utility/verifyToken");
const { VerifyUser } = require("../middleware/userVerifyMiddleware");
const { VerifyAdmin } = require("../middleware/adminVerifyMiddleware");


const router = express.Router();

//Auth PART

router.post("/registration", usersController.Registration);
router.post("/login", usersController.Login);

//USER PART



// Primary Check of All Middleware
/*
router.get("/check-authentication", VerifyToken, (req, res, next) => {
    res.send("Hello User, You are Logged in")
})

router.get("/check-user/:id", VerifyUser, (req, res, next) => {
    res.send("Hello User, You are logged in and you can delete your Account")
})

router.get("/check-admin/:id", VerifyAdmin, (req, res, next) => {
    res.send("Hello Admin, You are logged in and you can delete your Account")
})

*/

router.put("/update-user/:id", VerifyUser, usersController.UpdateUser)
router.delete("/delete-user/:id", VerifyUser, usersController.DeleteUser)
//get by ID
router.get("/get-user-by-id/:id", VerifyUser, usersController.GetUserById)
// get All User
router.get("/get-all-users", VerifyAdmin, usersController.GetAllUser)



module.exports = router; 