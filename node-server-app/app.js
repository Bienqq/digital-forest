const express = require("express")
const app = express()
const morgan = require("morgan")

const swaggerUi = require("swagger-ui-express")
const YAML = require('yamljs');
const swaggerDocument = YAML.load("./api/docs/swagger.yaml")
const ApiError = require("./api/common/ApiError")

const userRoutes = require("./api/routes/user")

//adding swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// logging some diagnostic information to the console
app.use(morgan("dev"))

//parsing request body
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

// Routes which should handle requests
app.use("/user", userRoutes)


// for CORS only
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next()
})

// errors handling
app.use((req, res, next) => {
    const error = new ApiError("Not found", 404)
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500)
    res.json({
        message: error.message,
        path: req.url,
        timestamp: new Date()
    })
})

module.exports = app;