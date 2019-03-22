const ApiError = require("../common/ApiError")
const multer = require("multer")
const crypto = require("crypto")
const fs = require("fs")

const UPLOAD_FILE_MAX_SIZE = Number(process.env.UPLOAD_FILE_MAX_SIZE)
const UPLOAD_FILES_MAX_AMOUNT = Number(process.env.UPLOAD_FILES_MAX_AMOUNT)

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
}).array("medias", UPLOAD_FILES_MAX_AMOUNT)

//special handler for incoming files
const uploadHandler = (request, response, next) => {
	uploader(request, response, (err) => {
		// error mapping
		if (err) {
			if (err.code == "LIMIT_UNEXPECTED_FILE") {
				return next(new ApiError("Zbyt duza ilość przesłanych plików", 400))
			}
			return next(err)
		} else {
			// special workaround for files validating with express-validator
			request.body.files = request.files
			next()
		}
	})
}

module.exports = uploadHandler