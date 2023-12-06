var jwt = require('jsonwebtoken');


// Check token is correct or Not

exports.VerifyToken = (req, res, next) => {
    const tokenKey = req.cookies.access_token;

    // token validation check
    if (!tokenKey) {
        return res.status(401).json({ success: false, message: "You are not Authenticated" }); // if token is not set in cookies
    }

    jwt.verify(tokenKey, process.env.JWT_SECRET_KEY, (err, information) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Token is not Valid" }); // if token is wrong
        }
        req.userInformation = information;
        next();
    });
};






