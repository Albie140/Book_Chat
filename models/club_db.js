module.exports = function (sequelize, DataTypes) {
    const Club = sequelize.define("Club", {

        google_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        book_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        book_author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pg_count: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        picture_url: {
            type: DataTypes.STRING(3000),
            allowNull: false
        }
    });
    return Club;
};