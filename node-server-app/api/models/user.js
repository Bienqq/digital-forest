const mongo = require("../database/mongo")

const userSchema = mongo.Schema({
    _id: mongo.Schema.Types.ObjectId,
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    role: {
        type: String,
        required: true,
    },
    // forester only 
    personalId: {
        type: Number,
    },
    firstName: {
        type: String
    },
    lastName:{
        type: String
    }
})

module.exports = mongo.model("User", userSchema)