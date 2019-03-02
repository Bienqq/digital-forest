const ApiError = require("../common/ApiError")
const {
    validationResult
} = require("express-validator/check")

module.exports = (request) => {
    const validationErrors = validationResult(request)
    if (!validationErrors.isEmpty()) {
        const message = validationErrors.array()[0].msg
        return new ApiError(message, 400)
    }
}