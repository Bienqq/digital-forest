const {
    check
} = require("express-validator/check")

exports.uploadContentValidator = [
    check("title").not().isEmpty().withMessage("Tytuł wpisu nie może być pusty"),
    check("description").not().isEmpty().withMessage("Treść wpisu nie może być pusta"),
]