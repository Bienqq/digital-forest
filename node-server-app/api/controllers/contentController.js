const ApiError = require("../common/ApiError")
const Article = require("../models/article")
const User = require("../models/user")
const checkValidation = require("../validators/checkValidation")
const multer = require('multer')
const crypto = require("crypto")
const mongoose = require("mongoose")
const sizeOf = require('image-size');
const fs = require('fs');
const VideoLib = require('node-video-lib');


const UPLOAD_FILES_MAX_AMOUNT = process.env.UPLOAD_FILES_MAX_AMOUNT
const UPLOAD_FILE_MAX_SIZE = process.env.UPLOAD_FILE_MAX_SIZE
const UPLOAD_FILES_ACCEPTED_FORMATS = process.env.UPLOAD_FILES_ACCEPTED_FORMATS.split(",")

const storageConfig = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, "./uploads")
    },
    filename: (request, file, callback) => {
        callback(null, crypto.randomBytes(10).toString("hex") + file.originalname)
    }
})

const fileFilterConfig = (request, file, callback) => {
    //save onluy accepted file formats
    if (UPLOAD_FILES_ACCEPTED_FORMATS.includes(file.mimetype)) {
        callback(null, true)
    } else {
        //reject a restricted file formats
        callback(new ApiError("Zły format pliku", 400), false)
    }
}

const uploader = multer({
    storage: storageConfig,
    limits: {
        fileSize: UPLOAD_FILE_MAX_SIZE
    },
    fileFilter: fileFilterConfig,
})

// upload is a midleware before handling request itself
exports.uploadContent = [uploader.array("medias", UPLOAD_FILES_MAX_AMOUNT), (request, response, next) => {
    const publisherLogin = request.userData.login
    User.find({
            login: publisherLogin
        })
        .select("_id")
        .then(publisher => {
            const article = new Article({
                _id: new mongoose.Types.ObjectId(),
                title: request.body.title,
                subTitle: request.body.subtitle,
                description: request.body.description,
                publishDate: new Date(),
                media: getMediaFromRequest(request),
                publisher: publisher[0]._id,
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
}]

function getMediaFromRequest(request) {
    const mediaFiles = request.files
    const medias = []
    for (let mediaFile of mediaFiles) {
        const media = {
            title: mediaFile.originalname,
            path: mediaFile.path,
            dimensions: getMediaDimensions(mediaFile)
        }
        medias.push(media)
    }
    return medias
}

function getMediaDimensions(mediaFile) {
    let dimensions
    if (mediaFile.mimetype.includes("video")) {
        const fd = fs.openSync(mediaFile.path, "r")
        const movie = VideoLib.MovieParser.parse(fd)
        return {
            width: movie.tracks[0].width,
            height: movie.tracks[0].height
        }
    } else {
        dimensions = sizeOf(mediaFile.path)
        return {
            width: dimensions.width,
            height: dimensions.height
        }
    }
}