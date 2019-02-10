const {
    check,
    validationResult
} = require("express-validator/check")
const User = require("../models/user");
const ApiError = require("../common/ApiError")

const ROLES = process.env.ROLES.split(",")

 //validation rules for each /user route
exports.userSignUpValidator = [
    check("email").isEmail().withMessage("Email is not correct"),
    check("login").not().isEmpty().withMessage("Login cannot be empty"),
    check("password").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).withMessage("Password is not correct"),
    check("email").custom(email => {
        return User.find({
            email: email
        }).then(result => {
            if (result.length >= 1) {
                return Promise.reject("E-mail already in use")
            }
        })
    }),
    check('login').custom(login => {
        return User.find({
            login: login
        }).then(result => {
            if (result.length >= 1) {
                return Promise.reject("Login already exists")
            }
        })
    }),
    check("role").not().isEmpty().withMessage("Role cannot be empty"),
    check("role").isIn(ROLES).withMessage("Unknown role, posible roles are: " + ROLES)
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