const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const User = require("../models/user")
const ApiError = require("../common/ApiError")
const jwt = require("jsonwebtoken")
const NodeCache = require("node-cache")
const checkValidation = require("../validators/checkValidation")

const FORESTER_ROLE = "FORESTER"

//bcrypt properties
const saltRounds = parseInt(process.env.SALT_ROUNDS)

//token properties
const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET
const JWT_TOKEN_EXPIRATION_TIME = parseInt(process.env.JWT_TOKEN_EXPIRATION_TIME)
const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET
const JWT_REFRESH_TOKEN_EXPIRATION_TIME = parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME)

//initialize cache, timeout for cache items is the same as for refresh token
const cache = new NodeCache({ stdTTL: JWT_REFRESH_TOKEN_EXPIRATION_TIME })

exports.userSignUp = (request, response, next) => {
	// check if any validation fails
	const err = checkValidation(request)
	if (err) {
		return next(err)
	}

	//check if login or e-mail does not dublicate with exiting ones in database
	User.find({
		login: request.body.login
	}).then(result => {
		if (result.length >= 1) {
			return next(new ApiError("Podany login już istnieje", 409))
		}
		User.find({
			email: request.body.email
		}).then(async result => {
			if (result.length >= 1) {
				return next(new ApiError("Podany e-mail już istnieje", 409))
			}
			if (request.body.personalId) {
				const result = await User.find({ personalId: request.body.personalId })
				if (result.length >= 1) {
					return next(new ApiError("Podany numer PESEL już istnieje", 409))
				}
			}

			//process request
			bcrypt.hash(request.body.password, saltRounds, (err, hash) => {
				if (err) {
					return next(err)
				} else {
					const user = new User({
						//regular user
						_id: new mongoose.Types.ObjectId(),
						login: request.body.login,
						password: hash,
						email: request.body.email,
						role: request.body.role,
						firstName: request.body.firstName,
						lastName: request.body.lastName,
						//forester only
						personalId: request.body.role === FORESTER_ROLE ? request.body.personalId : undefined,
						//login with facebook only
						facebookId: typeof request.body.facebookId === undefined ? undefined : request.body.facebookId
					})

					user.save().then(() => {
						return response.status(201).end()
					}).catch(err => {
						return next(err)
					})
				}
			})
		})
	}).catch(err => {
		return next(err)
	})
}

exports.userLogin = (request, response, next) => {
	// check if any validation fails
	const err = checkValidation(request)
	if (err) {
		return next(err)
	}

	//find non-facebook user and generate JWT
	User.find({
		login: request.body.login
	}).then(user => {
		if (user.length < 1) {
			return next(new ApiError("Niepoprawne dane logowania", 401))
		}

		bcrypt.compare(request.body.password, user[0].password, (err, result) => {
			if (err) {
				return next(err)
			}
			if (result) {
				const { token, refreshToken } = generateTokens(user[0])

				return response.status(200).json({
					message: "Zalogowano pomyślnie",
					token: token,
					expiresIn: JWT_TOKEN_EXPIRATION_TIME,
					refreshToken: refreshToken
				})
			}
			return next(new ApiError("Niepoprawne dane logowania", 401))
		})
	}).catch(err => {
		return next(err)
	})
}

exports.loginWithFacebook = (request, response, next) => {
	const err = checkValidation(request)
	if (err) {
		return next(err)
	}

	User.find({
		facebookId: request.body.facebookId
	}).then(user => {
		if (user.length < 1) {
			return next(new ApiError("Nie znaleziono użytkownika", 401))
		}

		const { token, refreshToken } = generateTokens(user[0])

		return response.status(200).json({
			message: "Zalogowano pomyślnie",
			token: token,
			expiresIn: JWT_TOKEN_EXPIRATION_TIME,
			refreshToken: refreshToken
		})

	}).catch(err => {
		return next(err)
	})
}

function generateTokens(user) {
	let { _id, role } = user
	_id = _id.toHexString()
	//generate token
	const token = jwt.sign({
		id: _id,
		role: role
	}, JWT_TOKEN_SECRET, {
		expiresIn: JWT_TOKEN_EXPIRATION_TIME
	})

	//generate refreshToken
	const refreshToken = jwt.sign({
		id: _id,
		role: role
	}, JWT_REFRESH_TOKEN_SECRET, {
		expiresIn: JWT_REFRESH_TOKEN_EXPIRATION_TIME
	})

	//add refresh token for user to node cache
	cache.set(_id, refreshToken)

	return {
		token: token,
		refreshToken: refreshToken
	}
}

exports.refreshToken = (request, response, next) => {
	// check if any validation fails
	const err = checkValidation(request)
	if (err) {
		return next(err)
	}
	const requestedRefreshToken = request.body.refreshToken
	const { id, role } = jwt.decode(requestedRefreshToken, JWT_REFRESH_TOKEN_SECRET)

	//get refreshToken for given user from cache
	const cachedRefreshToken = cache.get(id)
	if (typeof cachedRefreshToken === "undefined") {
		return next(new ApiError("Nie znaleziono refresh tokenu", 401))
	}
	//send newly generated token to user
	const newToken = jwt.sign({
		id: id,
		role: role
	}, JWT_TOKEN_SECRET, {
		expiresIn: JWT_TOKEN_EXPIRATION_TIME
	})
	return response.status(200).json({
		token: newToken
	})
}

exports.getUserInfo = (request, response, next) => {
	User.find({ _id: request.params.userId })
		.then(user => {
			if (user.length >= 1) {
				const res = {
					firstName: user[0].firstName,
					lastName: user[0].lastName,
					email: user[0].email,
					personalId: user[0].personalId,
					role: user[0].role
				}
				return response.status(200).json(res)

			}
			return next(new ApiError("Nie znaleziono podanego użytkownika", 404))
		})
		.catch(err => {
			if (err.name === "CastError") {
				return next(new ApiError("Niepoprawny format id", 400))
			}
			return next(err)
		})
}