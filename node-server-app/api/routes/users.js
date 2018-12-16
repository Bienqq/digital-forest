const express = require("express")
const router = express.Router()
const User = require("../models/user")

router.get("/:userId", (request, response) => {
    const id = request.params.userId
    User.findByPk(id).then(user => {
        if (user === null) {
            throw new Error("User not found")
        } else {
            response.status(200).json(user)
        }
    }).tapCatch("Database connection error")
})

module.exports = router