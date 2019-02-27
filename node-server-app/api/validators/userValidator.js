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
    check("email").not().isEmpty().withMessage("Email cannot be empty"),
    check("email").matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).withMessage("Email is not correct"),
    check("login").not().isEmpty().withMessage("Login cannot be empty"),
    check("password").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/).withMessage("Password is too weak"),
    check("role").not().isEmpty().withMessage("Role cannot be empty"),
    check("role").isIn(ROLES).withMessage("Unknown role, posible roles are: " + ROLES),
    check("firstName").not().isEmpty().withMessage("First name cannot be empty"),
    check("lastName").not().isEmpty().withMessage("Last name cannot be empty"),
    // optional validator for FORESTER role
    body("role").custom((role, {
        req
    }) => {
        if (role === FORESTER_ROLE) {
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