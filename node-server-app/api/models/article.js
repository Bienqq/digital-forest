const mongo = require("../database/mongo")

const articleSchema = mongo.Schema({
    _id: mongo.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
        trim: true,
    },
    subTitle: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    publishDate: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    media: [{
        title: {
            type: String,
            required: true,
        },
        dimensions: {
            width: {
                type: Number,
                required: true,
            },
            height: {
                type: Number,
                required: true,
            },
        },
        path: {
            type: String,
            required: true,
        },
        required: false,
    }],
    publisher: mongo.Schema.Types.ObjectId
})

module.exports = mongo.model("Article", articleSchema)