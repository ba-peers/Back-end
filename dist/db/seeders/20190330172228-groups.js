'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
       Example:
       */
    return queryInterface.bulkInsert('groups', [{
      name: 'group1',
      // user_id:1,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: function down(queryInterface, Sequelize) {
    /*
    Add reverting commands here.
    Return a promise to correctly handle asynchronicity.
     Example:
     */
    return queryInterface.bulkDelete('groups', null, {});
  }
};