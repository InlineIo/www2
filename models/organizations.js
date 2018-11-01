'use strict';
module.exports = (sequelize, DataTypes) => {
  const uuid = require("uuid");
  const organizations = sequelize.define('organizations', {
    name: DataTypes.STRING
  }, {});
  organizations.associate = function(models) {
    // associations can be defined here
  };
  organizations.beforeCreate((organization, _) => {
    organization.id = uuid();
    return organization;
  });
  return organizations;
};