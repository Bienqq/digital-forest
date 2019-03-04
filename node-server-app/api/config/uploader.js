const ApiError = require("../common/ApiError")
const multer = require("multer")
const crypto = require("crypto")
const fs = require("fs")

const UPLOAD_FILES_MAX_AMOUNT = process.env.UPLOAD_FILES_MAX_AMOUNT
const UPLOAD_FILE_MAX_SIZE = process.env.UPLOAD_FILE_MAX_SIZE
const UPLOAD_FILES_ACCEPTED_FORMATS = process.env.UPLOAD_FILES_ACCEPTED_FORMATS.split(",")
const UPLOAD_FILES_DIRECTORY = process.env.UPLOAD_FILES_DIRECTORY

// creating directory for uploading files 
if (!fs.existsSync(UPLOAD_FILES_DIRECTORY)) {
	fs.mkdirSync(UPLOAD_FILES_DIRECTORY)
}

// uploading files storge config
const storageConfig = multer.diskStorage({
	destination: (request, file, callback) => {
		//path to folder with uploaded files
		callback(null, UPLOAD_FILES_DIRECTORY)
	},
	filename: (request, file, callback) => {
		// naming of saved  files
		const fileExtension = file.mimetype.split("/")[1]
		const fileName = `${crypto.randomBytes(10).toString("hex")}.${fileExtension}`
		callback(null, fileName)
	}
})

// filter properties
const fileFilterConfig = (request, file, callback) => {
	//save only accepted file formats
	if (UPLOAD_FILES_ACCEPTED_FORMATS.includes(file.mimetype)) {
		callback(null, true)
	} else {
		//reject a restricted file formats
		callback(new ApiError("Zły format pliku", 400), false)
	}
}

//uploading files config
const uploader = multer({
	storage: storageConfig,
	limits: {
		fileSize: UPLOAD_FILE_MAX_SIZE
	},
	fileFilter: fileFilterConfig,
})

//TODO add validation for uploaded files
module.exports = uploader.array("medias", UPLOAD_FILES_MAX_AMOUNT)