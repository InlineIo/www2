'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('users', 'orgId')
    return queryInterface.addColumn('users',
      'organizationsId',
      Sequelize.UUID
    );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('users', 'organizationsId')
    return queryInterface.addColumn('users',
      'orgId',
      Sequelize.STRING
    );
  }
};
