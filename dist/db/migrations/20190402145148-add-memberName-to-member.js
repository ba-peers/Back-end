'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn('members', 'member_name', Sequelize.STRING);
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
       Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: function down(queryInterface, Sequelize) {

    return queryInterface.removeColumn('members', 'member_name');
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
       Example:
      return queryInterface.dropTable('users');
    */
  }
};