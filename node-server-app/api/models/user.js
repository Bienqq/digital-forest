const mongo = require("../database/mongo")

const ROLES = process.env.ROLES.split(",")

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
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    role: {
        type: String,
        enum: ROLES,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    //only for registration with facebook
    facebookId: {
        type: Number
    },
    // forester only 
    personalId: {
        type: Number,
    }
})

module.exports = mongo.model("User", userSchema)