const db = require("../database/db")

const user = db.define("users", {
    id: {
        type: db.Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    username: db.Sequelize.TEXT,
    email: db.Sequelize.TEXT,
    password: db.Sequelize.TEXT,
}, {
    timestamps: false, // removing default 'createdAt' 'updatedAt' fields from model
    freezeTableName: true, // removing pluralization of table names
})

module.exports = user