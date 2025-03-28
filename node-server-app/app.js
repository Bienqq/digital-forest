const express = require("express")
const app = express()
const morgan = require("morgan")
const swaggerUi = require("swagger-ui-express")
const YAML = require('yamljs')
const swaggerDocument = YAML.load("./api/docs/swagger.yaml")
const ApiError = require("./api/common/ApiError")
const userRoutes = require("./api/routes/user")
const contentRoutes = require("./api/routes/content")

const UPLOAD_FILES_DIRECTORY = process.env.UPLOAD_FILES_DIRECTORY
//adding swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// logging some diagnostic information to the console
app.use(morgan("dev"))

//parsing request body
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//folder for uploaded files
app.use("/" + UPLOAD_FILES_DIRECTORY, express.static(UPLOAD_FILES_DIRECTORY))

// added CORS header in the same begin of handling each request
app.use((request, response, next) => {
	response.header("Access-Control-Allow-Origin", "*")
	response.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	)
	response.header("Access-Control-Allow-Methods", "DELETE, POST, PUT, PATCH, GET, OPTIONS")
	if (request.method == "OPTIONS") {
		return response.status(200).end()
	}
	next()
})



// Routes which should handle requests
app.use("/user", userRoutes)
app.use("/content", contentRoutes)

// errors handling
app.use((request, response, next) => {
	const error = new ApiError("Not found", 404)
	next(error)
})

app.use((error, request, response, next) => {
	response.status(error.statusCode || 500)
	response.json({
		message: error.message,
		path: request.url,
		timestamp: new Date()
	})
})

module.exports = app