const jwt = require("jsonwebtoken")
const ApiError = require("../common/ApiError")

const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET

//midleware for checking authorization
module.exports = (request, response, next) => {
	try {
		//getting only token without "Bearer" word
		const token = request.headers.authorization.split(" ")[1]
		const decoded = jwt.verify(token, JWT_TOKEN_SECRET)
		request.userContext = decoded
		next()
	} catch (error) {
		return next(new ApiError("Authorization failed", 401))
	}
}