const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true })
	.then(mongooseInfo => console.log("Succesfuly connected to database : " + mongooseInfo.connections[0].host))
	.catch(error => console.error("Cannot connect to MongoDB due to : " + error))

module.exports = mongoose



