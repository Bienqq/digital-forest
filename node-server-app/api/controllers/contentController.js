const Article = require("../models/article")
const User = require("../models/user")
const checkValidation = require("../validators/checkValidation")
const mongoose = require("mongoose")
const sizeOf = require("image-size");
const fs = require("fs");
const VideoLib = require("node-video-lib");

// upload is a midleware before handling request itself
exports.uploadContent = (request, response, next) => {
	const err = checkValidation(request)
	if (err) {
		return next(err)
	}

	// get publisher _id from userData in request
	const publisherLogin = request.userData.login
	User.find({
			login: publisherLogin
		})
		.select("_id")
		.then(publisher => {
			// save content in database
			const article = new Article({
				_id: new mongoose.Types.ObjectId(),
				title: request.body.title,
				subTitle: request.body.subtitle,
				description: request.body.description,
				publishDate: new Date(),
				media: getMediaFromRequest(request),
				publisherUserId: publisher[0]._id,
			})

			article.save()
				.then(() => {
					return response.status(201).end()
				}).catch(err => {
					return next(err)
				})

		}).catch(err => {
			return next(err)
		})
}

function getMediaFromRequest(request) {
	const mediaFiles = request.files
	const medias = []
	for (let mediaFile of mediaFiles) {
		const media = {
			name: mediaFile.originalname,
			path: mediaFile.path.replace(/\\/g, "/"), // replacing backslash with forwardslash
			dimensions: getMediaDimensions(mediaFile)
		}
		medias.push(media)
	}
	return medias
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
		.select("_id title subtitle description publishDate media publisherUserId publisher")
		.then(async articles => {
			const contentResultList = []
			for (let article of articles) {
				const user = await User.findById(article.publisherUserId)
				const publisher = `${user.firstName} ${user.lastName}`
				const contentResult = {
					_id: article._id,
					title: article.title,
					subTitle: article.subTitle,
					description: article.description,
					media: getMedia(request, article.media),
					publisher: publisher
				}
				contentResultList.push(contentResult)
			}
			const res = {
				count: articles.length,
				content: contentResultList
			}
			return response.status(200).json(res)
		})
		.catch(err => {
			return next(err)
		})
}

function getMedia(request, medias) {
	const resultMediasList = []
	for (media of medias) {
		let { name, dimensions, path } = media
		path = `${request.protocol}://${request.hostname}:${process.env.PORT || 8080}/${path}`
		const mediaResult = {
			name,
			dimensions,
			path
		}
		resultMediasList.push(mediaResult)
	}
	return resultMediasList
}