const express = require("express");
const router = express.Router();
const {
    check,
    validationResult
} = require("express-validator/check")
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const User = require("../models/user");

const saltRounds = parseInt(process.env.SALT_ROUNDS)
const ROLES = process.env.ROLES.split(",") 

router.post("/signup", [
    //validation rules
    check("email").isEmail().withMessage("Email is not correct"),
    check("password").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).withMessage("Password is not correct"),
    check("email").custom(email => {
        return User.find({
            email: email
        }).then(result => {
            if (result.length >= 1) {
                return Promise.reject("E-mail already in use")
            }
        })
    }),
    check('login').custom(login => {
        return User.find({
            login: login
        }).then(result => {
            if (result.length >= 1) {
                return Promise.reject("Login already exists")
            }
        })
    }),
    check("role").not().isEmpty().withMessage("Property \"role\" cannot be empty"),
    check("role").custom(profile => {
        if(!ROLES.includes(profile)){
            return Promise.reject("Unknown role, posible roles are: " + ROLES)
        }
    })
], (request, response, next) => {
    // check if any validation fails
    const validationErrors = validationResult(request)
    if (!validationErrors.isEmpty()) {
        const message = validationErrors.array()[0].msg
        const err = new Error(message)
        err.status = 400
        return next(err)
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

});

module.exports = router