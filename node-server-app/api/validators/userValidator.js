const { check, body } = require("express-validator/check")
const ApiError = require("../common/ApiError")

const ROLES = process.env.ROLES.split(",")
const FORESTER_ROLE = "FORESTER"
const PERSONAL_ID_LENGTH = 11

//validation rules for each /user route
exports.userSignUpValidator = [
	check("email").not().isEmpty().withMessage("E-mail nie może być pusty"),
	check("email").matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).withMessage("Padany e-mail jest niepoprawny"),
	check("login").not().isEmpty().withMessage("Login nie może być pusty"),
	check("password").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/).withMessage("Podane hasło jest za słabe"),
	check("role").not().isEmpty().withMessage("Rola użytkownika nie może być pustya"),
	check("role").isIn(ROLES).withMessage("Nieznana rola użytkownika, możliwe role: " + ROLES),
	check("firstName").not().isEmpty().withMessage("Imię nie może być puste"),
	check("lastName").not().isEmpty().withMessage("Nazwisko nie może być puste"),
	// optional validator for FORESTER role
	body("role").custom((role, {
		req
	}) => {
		if (role === FORESTER_ROLE) {
			let personalId = req.body.personalId
			if (!personalId) {
				throw new ApiError("PESEL nie może być pusty", 400)
			}
			personalId = personalId.toString()
			if (personalId.length < PERSONAL_ID_LENGTH) {
				throw new ApiError("PESEL ma niepoprawny format", 400)
			}
		}
		return true
	})
]

exports.userLoginValidator = [
	check("login").not().isEmpty().withMessage("Login nie może być pusty"),
	check("password").not().isEmpty().withMessage("Hasło nie może być puste")
]

exports.refreshTokenValidator = [
	check("refreshToken").not().isEmpty().withMessage("Refresh token nie może być pusty")
]

exports.loginWithFacebookValidator = [
	check("facebookId").not().isEmpty().withMessage("FacebookId nie może być puste")
]