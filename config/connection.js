var Sequelize = require("sequelize");


var connection = new Sequelize("bookchat_sequelize", "root", "Omicat34", {
    host: "localhost",
    port: process.env.PORT || 3306,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 10000 
    }
});

module.exports = connection;