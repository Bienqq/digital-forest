const express = require("express");
const router = express.Router();
const checkAuth = require("../auth/auth")
const userValidator = require("../validators/userValidator")
const userController = require("../controllers/userController")

// routes below
// params: router.<http_method>(path, authValidator?, dataValidator?, method)
router.post("/signup", userValidator.userSignUpValidator, userController.userSignUp);
router.post("/login", userValidator.userLoginValidator, userController.userLogin)
router.post("/refresh-token", userValidator.refreshTokenValidator, userController.refreshToken)
router.post("/login-facebook", userValidator.loginWithFacebookValidator, userController.loginWithFacebook)

//for test purposes only
router.get("/test", checkAuth, (request, response, next) => {
    response.status(200).json({
        message: "Protected route"
    })
})
 
module.exports = router