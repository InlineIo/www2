'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("projects",
      "organizationsId",
      Sequelize.UUID
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("projects", "organizationsId");
  }
};
