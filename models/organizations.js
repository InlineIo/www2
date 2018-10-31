'use strict';
module.exports = (sequelize, DataTypes) => {
  const organizations = sequelize.define('organizations', {
    name: DataTypes.STRING
  }, {});
  organizations.associate = function(models) {
    // associations can be defined here
  };
  return organizations;
};