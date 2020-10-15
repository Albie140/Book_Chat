module.exports = function (sequelize, DataTypes) {
    const Response = sequelize.define("Response", {

        comment: {
            type: DataTypes.STRING(1500),
            allowNull: false
        }
    });

    Response.associate = function (models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Response.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        Response.belongsTo(models.Thread, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Response;
};