const Article = require("../models/article")
const User = require("../models/user")
const checkValidation = require("../validators/checkValidation")
const ApiError = require("../common/ApiError")
const mongoose = require("mongoose")
const sizeOf = require("image-size")
const fs = require("fs")
const VideoLib = require("node-video-lib")
const ffmpeg = require("ffmpeg")

const UPLOAD_FILES_DIRECTORY = process.env.UPLOAD_FILES_DIRECTORY

// upload is a midleware before handling request itself
exports.uploadContent = async (request, response, next) => {
	const err = checkValidation(request)
	if (err) {
		return next(err)
	}

	// save content in database
	const article = new Article({
		_id: new mongoose.Types.ObjectId(),
		title: request.body.title,
		subTitle: request.body.subTitle !== undefined ? request.body.subTitle : undefined,
		description: request.body.description,
		publishDate: new Date(),
		media: await getMediaFromRequest(request),
		publisherUserId: request.userContext.id
	})

	article.save()
		.then(() => {
			return response.status(201).end()
		}).catch(err => {
			return next(err)
		})
}

async function getMediaFromRequest(request) {
	const mediaFiles = request.files
	const medias = []
	for (let mediaFile of mediaFiles) {
		//getting type of media 
		const type = mediaFile.originalname.split(".")[1] === "mp4" ? "video" : "image"
		//create poster only when we have video
		const posterPath = type === "video" ? await getPosterFromVideo(mediaFile) : undefined
		const media = {
			name: mediaFile.originalname,
			path: mediaFile.path.replace(/\\/g, "/"), // replacing backslash in path with forwardslash
			dimensions: getMediaDimensions(mediaFile),
			type: type,
			posterPath: posterPath
		}
		medias.push(media)
	}
	return medias
}

async function getPosterFromVideo(mediaFile) {
	const nameWithoutExtension = mediaFile.filename.split(".")[0]
	const posterName = `poster_${nameWithoutExtension}.jpeg`
	const posterPath = `${UPLOAD_FILES_DIRECTORY}/${posterName}`
	// create ffmpeg command to extract 1 frame from video
	const ffmpegProcess = await new ffmpeg(`./${mediaFile.path}`)
	ffmpegProcess.addCommand("-ss", "00:00:00")
	ffmpegProcess.addCommand("-vframes", "1")
	//executing ffmpeg comand and save frame jpg result to uploads directory
	ffmpegProcess.save(posterPath)
	return posterPath
}

function getMediaDimensions(mediaFile) {
	if (mediaFile.mimetype.includes("video")) {
		const fd = fs.openSync(mediaFile.path, "r")
		const movie = VideoLib.MovieParser.parse(fd)
		return {
			width: movie.tracks[0].width,
			height: movie.tracks[0].height
		}
	} else {
		const dimensions = sizeOf(mediaFile.path)
		return {
			width: dimensions.width,
			height: dimensions.height
		}
	}
}

exports.getAllContent = (request, response, next) => {
	Article.find()
		.select("_id title subTitle description publishDate media publisherUserId publisher")
		.sort({ publishDate: "descending" })
		.then(async articles => {
			const contentResultList = []
			for (let article of articles) {
				const user = await User.findById(article.publisherUserId)
				const publisher = user != null ? `${user.firstName} ${user.lastName}`: ""
				const contentResult = {
					id: article._id,
					title: article.title,
					subTitle: article.subTitle,
					description: article.description,
					media: getMedia(request, article.media),
					publisher: publisher,
					publishDate: article.publishDate.toISOString().substring(0, 10),
				}
				contentResultList.push(contentResult)
			}
			const res = { count: articles.length, content: contentResultList }
			return response.status(200).json(res)
		})
		.catch(err => {
			return next(err)
		})
}

function getMedia(request, medias) {
	const resultMediasList = []
	for (media of medias) {
		let { name, dimensions, type, path, posterPath } = media
		const hostPath = `${request.protocol}://${request.hostname}:${process.env.PORT || 8080}/`
		path = hostPath + path
		if (posterPath !== undefined) {
			posterPath = hostPath + posterPath
		}
		const mediaResult = { name, dimensions, type, path, posterPath }
		resultMediasList.push(mediaResult)
	}
	return resultMediasList
}

exports.deleteContent = (request, response, next) => {
	//deleting content data from database
	Article.findByIdAndDelete(request.params.contentId)
		.then(article => {
			if (!article) {
				return response.status(204).end()
			}
			// delete content from static directory
			for (media of article.media) {
				fs.unlinkSync(`${__dirname}/../../${media.path}`)
			}
			return response.status(204).end()
		})
		.catch(err => {
			if (err.name === "CastError") {
				return next(new ApiError("Niepoprawny format id", 400))
			}
			return next(err)
		})
}