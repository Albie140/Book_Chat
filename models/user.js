// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    // The username cannot be null, and must be a proper username before creation
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // The first name cannot be null
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // The last name cannot be null
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  User.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    User.hasMany(models.Association, {
      onDelete: "cascade"
    });
    User.hasMany(models.Thread, {
      onDelete: "cascade"
    });
    User.hasMany(models.Response, {
      onDelete: "cascade"
    });
  };
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
// this might work NOT sure
  User.fullname = () => {
    fullName = first_name + " " + last_name;
    return fullName;
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", user => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  return User;
};
