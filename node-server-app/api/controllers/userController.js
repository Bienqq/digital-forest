const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const User = require("../models/User");
const ApiError = require("../common/ApiError")
const jwt = require("jsonwebtoken")
const {validationResult} = require("express-validator/check")

const saltRounds = parseInt(process.env.SALT_ROUNDS)
const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRATION_TIME = parseInt(process.env.JWT_EXPIRATION_TIME)

//endpoint logic below
exports.userSignUp = (request, response, next) => {
    // check if any validation fails
    const validationErrors = validationResult(request)
    if (!validationErrors.isEmpty()) {
        const message = validationErrors.array()[0].msg
        return next(new ApiError(message, 400))
    }
    //process validated data
    bcrypt.hash(request.body.password, saltRounds, (err, hash) => {
        if (err) {
            return next(err)
        } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                login: request.body.login,
                password: hash,
                email: request.body.email,
                role: request.body.role
            });
            user.save()
                .then((result) => {
                    return response.status(201).end()
                }).catch(err => {
                    return next(err)
                })
        }
    })
}

exports.userLogin = (request, response, next) => {
    // check if any validation fails
    const validationErrors = validationResult(request)
    if (!validationErrors.isEmpty()) {
        const message = validationErrors.array()[0].msg
        return next(new ApiError(message, 400))
    }
    //find user and generate JWT
    User.find({
        login: request.body.login
    }).exec().then(user => {
        if (user.length < 1) {
            return next(new ApiError("Authorization failed", 401))
        }
        bcrypt.compare(request.body.password, user[0].password, (err, result) => {
            if (err) {
                return next(err)
            }
            if (result) {
                const token = jwt.sign({
                    login: user[0].login,
                    role: user[0].role
                }, JWT_SECRET, {
                    expiresIn: JWT_EXPIRATION_TIME
                })

                return response.status(200).json({
                    message: "Authorization successful",
                    token: token,
                    expiresIn: JWT_EXPIRATION_TIME
                })
            }
            return next(new ApiError("Authorization failed", 401))
        })
    }).catch(err => {
        return next(err)
    })
}