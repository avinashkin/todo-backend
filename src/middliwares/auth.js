const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (!err) {
                req.user = user;
                next();
            } else {
                return res.status(403).json({message: "User not authorized", error: err.message});
            }
        })
    } else {
        return res.status(403).json({message: "User not logged in!"});
    }
}

module.exports = authorize;