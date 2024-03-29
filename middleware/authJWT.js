const jwt = require('jsonwebtoken');

const authJWT = (req, res, next) => {
    console.log("reqqqq");
    console.log("auth", req.headers.authorization);
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403)
            }
            req.user = user
            next();
        });
    } else {
        res.sendStatus(401)
    }
}

module.exports = authJWT;