const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).send({
                success: false,
                message: "Token is blank"
            });
        }
        let newtoken = token.slice(7);
        jwt.verify(newtoken, "all-api", (err, user) => {
            if (err) {
                return res.status(404).send({
                    success: false,
                    message: "Token is not valid"
                })
            }
            req.user = user.payload
            return next();
        })
    } catch (err) {
        console.log(err);

        return false;
    }
}


module.exports = {
    verifyToken
}