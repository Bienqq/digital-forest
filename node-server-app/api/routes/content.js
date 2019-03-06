const express = require("express")
const router = express.Router()
const checkAuth = require("../auth/auth")
const { uploadContentValidator } = require("../validators/contentValidator")
const { uploadContent, getAllContent, deleteContent } = require("../controllers/contentController")
const uploader = require("../config/uploader")

// routes below
router.post("/upload", checkAuth, uploader, uploadContentValidator, uploadContent)
router.get("/all-content", checkAuth, getAllContent)
router.delete("/:contentId", checkAuth, deleteContent)

module.exports = router