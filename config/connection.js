var Sequelize = require("sequelize");
// var mysql = require("mysql");
const { config } = require("dotenv/types");



if (config.use_env_variable) {
    var connection = new Sequelize(process.env[config.use_env_variable]);
} else {
    var connection = new Sequelize(config.database, config.username, config.password, config);
}

// connection = new Sequelize("bookchat_sequelize", "root", process.env.DB_PASS, {
//     host: "localhost",
//     port: process.env.PORT || 8080,
//     dialect: "mysql",
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 10000 
//     }
// });


module.exports = connection;