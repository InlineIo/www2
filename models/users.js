"use strict";
module.exports = (sequelize, DataTypes) => {
  const uuid = require("uuid"),
    users = sequelize.define("users", {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      pwd: DataTypes.STRING,
      salt: DataTypes.STRING,
      organizationsId: DataTypes.UUID,
      role: DataTypes.STRING
    }, {});
  users.associate = (models) => {
    users.belongsTo(models.organizations);
    // associations can be defined here
  };
  users.beforeCreate((user) => {
    user.id = uuid();
    return user;
  });
  return users;
};
