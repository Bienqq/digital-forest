const express = require("express")
const router = express.Router()
const checkAuth = require("../auth/auth")
const contentValidator = require("../validators/contentValidator")
const contentController = require("../controllers/contentController")

// routes below
router.post("/upload", checkAuth, contentValidator.uploadContentValidator, contentController.uploadContent)

module.exports = router