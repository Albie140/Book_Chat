module.exports = function (sequelize, DataTypes) {
    const Association = sequelize.define("Association", {

        is_fav: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: true
        },
        current_pg: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 0
        },
    });

    Association.associate = function (models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Association.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        Association.belongsTo(models.Club, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Association;
};