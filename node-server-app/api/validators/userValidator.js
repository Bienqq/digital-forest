const {
    check,
    body,
    validationResult
} = require("express-validator/check")
const ApiError = require("../common/ApiError")

const ROLES = process.env.ROLES.split(",")

const FORESTER_ROLE = "FORESTER"
const PERSONAL_ID_LENGTH = 11

//validation rules for each /user route
exports.userSignUpValidator = [
    check("email").isEmail().withMessage("Email is not correct"),
    check("login").not().isEmpty().withMessage("Login cannot be empty"),
    check("password").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).withMessage("Password is too weak"),
    check("role").not().isEmpty().withMessage("Role cannot be empty"),
    check("role").isIn(ROLES).withMessage("Unknown role, posible roles are: " + ROLES),
    // optional validator for FORESTER role
    body("role").custom((role, {
        req
    }) => {
        if (role === FORESTER_ROLE) {
            if (!req.body.firstName) {
                throw new ApiError("First name cannot be empty", 400)
            }
            if (!req.body.lastName) {
                throw new ApiError("Last name cannot be empty", 400)
            }
            let personalId = req.body.personalId
            if (!personalId) {
                throw new ApiError("Field \"personalId\" cannot be empty", 400)
            }
            personalId = personalId.toString()
            if (personalId.length < PERSONAL_ID_LENGTH) {
                throw new ApiError("Field \"personalId\" has invalid format", 400)
            }
        } 
        return true
    })
]

exports.userLoginValidator = [
    check("login").not().isEmpty().withMessage("Login cannot be empty"),
    check("password").not().isEmpty().withMessage("Password cannot be empty")
]

exports.refreshTokenValidator = [
    check("refreshToken").not().isEmpty().withMessage("Refresh token is cannot be empty")
]

exports.checkValidation = (request) => {
    const validationErrors = validationResult(request)
    if (!validationErrors.isEmpty()) {
        const message = validationErrors.array()[0].msg
        return new ApiError(message, 400)
    }
}