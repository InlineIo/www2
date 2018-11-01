'use strict';
module.exports = (sequelize, DataTypes) => {
  const uuid = require("uuid");
  const users = sequelize.define('users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    pwd: DataTypes.STRING,
    salt: DataTypes.STRING,
    organizationsId: DataTypes.UUID,
    role: DataTypes.STRING
  }, {});
  users.associate = function (models) {
    users.belongsTo(models.organizations);
    // associations can be defined here
  };
  users.beforeCreate((user, _) => {
    user.id = uuid();
    return user;
  });
  return users;
};