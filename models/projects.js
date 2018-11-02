"use strict";
module.exports = (sequelize, DataTypes) => {
  const uuid = require("uuid"),
    projects = sequelize.define("projects", {
      name: DataTypes.STRING,
      organizationsId: DataTypes.UUID
    }, {});

  // projects.associate = (models) => {
  //   // associations can be defined here
  // };
  projects.beforeCreate((project) => {
    project.id = uuid();
    return project;
  });
  return projects;
};
