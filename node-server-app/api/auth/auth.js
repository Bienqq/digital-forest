const jwt = require("jsonwebtoken")
const ApiError = require("../common/ApiError")
const JWT_SECRET = process.env.JWT_SECRET

module.exports = (request, response, next) => {
    try {
        //getting only token without "Bearer" word
        const token = request.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, JWT_SECRET)
        request.userData = decoded
        next()
    } catch (error) {
        return next(new ApiError("Authorization failed", 401))
    }
}