const Sequelize = require("sequelize")

const database = new Sequelize(`${process.env.DB_SCHEMA_NAME}`, `${process.env.DB_LOGIN}`, `${process.env.DB_PASSWORD}`, {
    host: `${process.env.DB_ADDRESS}`,
    dialect: "postgres"
})

database.authenticate()
    .then(() => console.log("Connection with database has been established successfully"))
    .catch(error => console.error("Unable to connect to the database: " +  error))

module.exports = database