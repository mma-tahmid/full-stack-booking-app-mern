const { VerifyToken } = require("../utility/verifyToken");

exports.VerifyAdmin = (req, res, next) => {
    VerifyToken(req, res, () => {
        if (req.userInformation.isAdmin) {              //req.userInformation get in verifyToken.js File
            next();
        } else {
            return res.status(403).json({ success: false, message: "You are not authorized Admin!" });
        }
    });
};





