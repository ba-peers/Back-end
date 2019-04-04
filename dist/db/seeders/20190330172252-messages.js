'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
       Example:
      */
    return queryInterface.bulkInsert('messages', [{
      dateCol: '2001-10-05',
      timeCol: '01:00:0',
      body: 'tttttttt',
      member_id: 1,
      updated_at: new Date(),
      created_at: new Date()
    }], {});
  },

  down: function down(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
       Example:
       */
    return queryInterface.bulkDelete('messages', null, {});
  }
};