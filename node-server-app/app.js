const express = require("express")
const app = express()
const morgan = require("morgan")

// logging some diagnostic information to the console
app.use(morgan("dev"))

// for CORS only
app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*")
    next()
})

// errors handling
app.use((request, response, next) => {
    const error = new Error("Not found")
    error.status = 404;
    next(error)
})

app.use((error, request, response, next) => {
    response.status(error.status || 500)
    response.json({
        error: {
            message: error.message,
            path: request.url,
            timestamp: new Date()
        }
    })
})

module.exports = app;