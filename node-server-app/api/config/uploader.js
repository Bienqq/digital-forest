const ApiError = require("../common/ApiError")
const multer = require("multer")
const crypto = require("crypto")
const path = require("path")

const UPLOAD_FILES_MAX_AMOUNT = process.env.UPLOAD_FILES_MAX_AMOUNT
const UPLOAD_FILE_MAX_SIZE = process.env.UPLOAD_FILE_MAX_SIZE
const UPLOAD_FILES_ACCEPTED_FORMATS = process.env.UPLOAD_FILES_ACCEPTED_FORMATS.split(",")

// uploading files storge config
const storageConfig = multer.diskStorage({
	destination: (request, file, callback) => {
		//path to folder with uploaded files
		callback(null, "./uploads")
	},
	filename: (request, file, callback) => {
		// naming of saved  files
		const extension = path.extname(file.originalname)
		callback(null, crypto.randomBytes(10).toString("hex") + extension)
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

module.exports = uploader.array("medias", UPLOAD_FILES_MAX_AMOUNT)