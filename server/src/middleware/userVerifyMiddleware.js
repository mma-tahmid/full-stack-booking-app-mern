const { VerifyToken } = require("../utility/verifyToken");

exports.VerifyUser = (req, res, next) => {
    VerifyToken(req, res, () => {
        if (req.userInformation.id === req.params.id || req.userInformation.isAdmin) {
            //req.userInformation get in verifyToken.js File
            // req.userInformation.id is cookie token
            next();
        } else {
            return res.status(403).json({ success: false, message: "You are not authorized!" });
        }
    });
};
