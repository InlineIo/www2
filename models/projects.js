'use strict';
module.exports = (sequelize, DataTypes) => {
  const uuid = require("uuid");
  const projects = sequelize.define('projects', {
    name: DataTypes.STRING
  }, {});
  projects.associate = function(models) {
    // associations can be defined here
  };
  projects.beforeCreate((project, _) => {
    project.id = uuid();
    return project;
  });
  return projects;
};