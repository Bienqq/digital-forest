const ApiError = require("../common/ApiError")
const Article = require("../models/article")
const User = require("../models/user")
const checkValidation = require("../validators/checkValidation")
const multer = require("multer")
const crypto = require("crypto")
const mongoose = require("mongoose")
const sizeOf = require("image-size");
const fs = require("fs");
const VideoLib = require("node-video-lib");

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
        callback(null, crypto.randomBytes(10).toString("hex") + file.originalname)
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

// upload is a midleware before handling request itself
exports.uploadContent = [uploader.array("medias", UPLOAD_FILES_MAX_AMOUNT), (request, response, next) => {
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