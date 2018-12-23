const express = require("express")
const router = express.Router()
const User = require("../models/user")

router.get("/:userId", (request, response, next) => {
    const id = request.params.userId
    User.findByPk(id).then(user => {
        if (user === null) {
            next(new Error("User not found"))
        } else {
            response.status(200).json(user)
        }
    }).tapCatch("Database connection error")
})

router.post("/signup", (request, response) =>{
    const body = request.body
    console.log(body)
})




module.exports = router