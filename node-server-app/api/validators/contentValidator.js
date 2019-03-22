const { check, body } = require("express-validator/check")
const ApiError = require("../common/ApiError")

const MAX_TITLE_LENGTH = Number(process.env.CONTENT_TITLE_LENGTH)
const MAX_SUBTITLE_LENGTH = Number(process.env.CONTENT_SUBTITLE_LENGTH)
const MAX_DESCRIPTION_LENGTH = Number(process.env.CONTENT_DESCRIPTION_LENGTH)
const UPLOAD_VIDEOS_MAX_AMOUNT = Number(process.env.UPLOAD_VIDEOS_MAX_AMOUNT)
const VIDEO_TYPE = "video/mp4"

exports.uploadContentValidator = [
	check("title").not().isEmpty().withMessage("Tytuł wpisu nie może być pusty"),
	check("description").not().isEmpty().withMessage("Treść wpisu nie może być pusta"),
	check("title").isLength({ max: MAX_TITLE_LENGTH }).withMessage(`Długość tytułu nie może przekraczać ${MAX_TITLE_LENGTH} znaków`),
	check("subTitle").isLength({ max: MAX_SUBTITLE_LENGTH }).withMessage(`Długość podtytułu nie może przekraczać ${MAX_SUBTITLE_LENGTH} znaków`),
	check("description").isLength({ max: MAX_DESCRIPTION_LENGTH }).withMessage(`Długość wpisu nie może przekraczać ${MAX_DESCRIPTION_LENGTH} znaków`),
	body("files").custom((mediaFiles) => {
		const incomingFileTypes = mediaFiles.map(media => media.mimetype)
		if (incomingFileTypes.includes(VIDEO_TYPE) && mediaFiles.length > UPLOAD_VIDEOS_MAX_AMOUNT) {
			throw new ApiError(`Można wysłać maksymalnie ${UPLOAD_VIDEOS_MAX_AMOUNT} video`)
		}
		return true
	})
]