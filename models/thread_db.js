module.exports = function (sequelize, DataTypes) {
    const Thread = sequelize.define("Thread", {

        topic: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pg_num: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    });

    Thread.associate = function (models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Thread.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        Thread.belongsTo(models.Club, {
            foreignKey: {
                allowNull: false
            }
        });
        Thread.hasMany(models.Response, {
            onDelete: "cascade"
        });
    };

    return Thread;
};