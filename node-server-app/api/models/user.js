const mongo = require("../database/mongo")

const userSchema = mongo.Schema({
    _id: mongo.Schema.Types.ObjectId,
    login: String,
    password: String,
    email: String,
    role: String
})

module.exports = mongo.model("User", userSchema)