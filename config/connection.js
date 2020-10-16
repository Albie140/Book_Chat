var Sequelize = require("sequelize");
var mysql = require("mysql");


var connection;

if (process.env.JAWSDB_URL) {
connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {

connection = new Sequelize("bookchat_sequelize", "root", process.env.DB_PASS, {
    host: "localhost",
    port: process.env.PORT || 8080,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 10000 
    }
});
}

module.exports = connection;