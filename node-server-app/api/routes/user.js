const express = require("express")
const router = express.Router()
const { userSignUpValidator, userLoginValidator, refreshTokenValidator, loginWithFacebookValidator } = require("../validators/userValidator")
const { userSignUp, userLogin, refreshToken, loginWithFacebook } = require("../controllers/userController")

// routes below
// params: router.<http_method>(path, authValidator?, dataValidator?, method)
router.post("/signup", userSignUpValidator, userSignUp)
router.post("/login", userLoginValidator, userLogin)
router.post("/refresh-token", refreshTokenValidator, refreshToken)
router.post("/login-facebook", loginWithFacebookValidator, loginWithFacebook)

module.exports = router