
const bcrypt = require('bcrypt');
var jwtWebtoken = require('jsonwebtoken');
const usersModel = require("../models/UsersModel")

// Auth PART


exports.Registration = async (req, res) => {
    try {

        const { userName, email, password } = req.body

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);  //const hash = bcrypt.hashSync(req.body.password, salt); 

        let newUser = new usersModel({
            userName,
            email,
            password: hash
        })

        let result = await newUser.save();
        res.status(200).send("User has been Created")

    }

    catch (error) {
        res.status(200).json({ status: "Fail", data: error })
    }

}


// Login


exports.Login = async (req, res) => {

    try {

        const { userName, password } = req.body

        const users = await usersModel.findOne({ userName })
        if (!users) {
            return res.status(401).json({ success: false, message: "User is not Found" });
        }


        const isPasswordMatch = await bcrypt.compare(password, users.password)
        if (!isPasswordMatch) {
            return res.status(401).json({ success: false, message: "Wrong Password" });
        }


        // token Create

        const jwtToken = jwtWebtoken.sign({ id: users._id, isAdmin: users.isAdmin }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })

        // Doesn't show passowrd & isAdmin Field
        // Exclude the password field from the user object before sending the response
        const { password: excludedPassword, isAdmin, ...otherDetails } = users.toObject();
        //Error:  Cannot redeclare block-scoped variable 'password'. How to solve it 
        //Solution: To fix this issue, you can choose a different variable name in the destructuring assignment for excluding the password field. Here's an updated version of the code: 

        res.cookie("access_token", jwtToken, {
            expires: new Date(Date.now() + 3600000),
            httpOnly: true
        }).status(200).json({ ...otherDetails })    // access_token is a token Name

    }

    catch (error) {
        res.status(200).json({ status: "Fail", data: error })
    }
}


// USER PART

// UPDATE USER
exports.UpdateUser = async (req, res) => {

    try {

        let updateUser = await usersModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })

        res.status(200).json({ status: "Success", data: updateUser })
    }
    // {new: true} means: return the updated version of previous Document

    catch (error) {
        res.status(200).json({ status: "Fail", data: error })
    }
}


// Delete User

exports.DeleteUser = async (req, res) => {
    try {

        let deleteUser = await usersModel.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been Deleted")
    }

    catch (error) {
        res.status(200).json({ status: "Fail", data: error })
    }

}



exports.GetUserById = async (req, res) => {
    try {


        let result = await usersModel.findById(req.params.id)
        res.status(200).json({ status: "Success", data: result })
    }

    catch (error) {
        res.status(200).json({ status: "Fail", data: error })
    }


}

exports.GetAllUser = async (req, res) => {
    try {


        let result = await usersModel.find()
        res.status(200).json({ status: "Success", data: result }) // data: result, this result show data in postman
    }

    catch (error) {
        res.status(200).json({ status: "Fail", data: error })
    }

}


