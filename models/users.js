'use strict';
module.exports = (sequelize, DataTypes) => {
  const uuid = require("uuid");
  const users = sequelize.define('users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    pwd: DataTypes.STRING,
    salt: DataTypes.STRING,
    orgId: DataTypes.UUID
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  users.beforeCreate((user, _) => {
    user.id = uuid();
    return user;
  });
  return users;
};