const Sequelize = require("sequelize")


var sequelize = new Sequelize("sequelize_bookchat", "root", "Omicat34", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 10000 
    }
});

module.exports = connection