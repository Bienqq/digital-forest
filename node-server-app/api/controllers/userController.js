const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const User = require("../models/user");
const ApiError = require("../common/ApiError")
const jwt = require("jsonwebtoken")
const {
    validationResult
} = require("express-validator/check")
const NodeCache = require("node-cache")

//bcrypt settings
const saltRounds = parseInt(process.env.SALT_ROUNDS)

//token settings
const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET
const JWT_TOKEN_EXPIRATION_TIME = parseInt(process.env.JWT_TOKEN_EXPIRATION_TIME)
const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET
const JWT_REFRESH_TOKEN_EXPIRATION_TIME = parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME)

//initialize cache, timeout for cache items is the same as for token
const cache = new NodeCache({
    stdTTL: JWT_REFRESH_TOKEN_EXPIRATION_TIME
})

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

                const login = user[0].login
                const role = user[0].role

                //generate token
                const token = jwt.sign({
                    login: login,
                    role: role
                }, JWT_TOKEN_SECRET, {
                    expiresIn: JWT_TOKEN_EXPIRATION_TIME
                })

                //generate refreshToken
                const refreshToken = jwt.sign({
                    login: login,
                    role: role
                }, JWT_REFRESH_TOKEN_SECRET, {
                    expiresIn: JWT_REFRESH_TOKEN_EXPIRATION_TIME
                })

                //add token for user to node cache
                cache.set(login, refreshToken)

                return response.status(200).json({
                    message: "Authorization successful",
                    token: token,
                    expiresIn: JWT_TOKEN_EXPIRATION_TIME,
                    refreshToken: refreshToken
                })
            }
            return next(new ApiError("Authorization failed", 401))
        })
    }).catch(err => {
        return next(err)
    })
}

exports.refreshToken = (request, response, next) => {
    const requestedRefreshToken = request.body.refreshToken
    const {
        login,
        role
    } = jwt.decode(requestedRefreshToken, JWT_REFRESH_TOKEN_SECRET)
    //get refreshToken for given user from cache
    const cachedRefreshToken = cache.get(login)
    if (typeof cachedRefreshToken === "undefined") {
        return next(new ApiError("Authorization failed", 401))
    }

    const newToken = jwt.sign({
        login: login,
        role: role
    }, JWT_TOKEN_SECRET, {
        expiresIn: JWT_TOKEN_EXPIRATION_TIME
    })

    return response.status(200).json({
        token: newToken
    })

}