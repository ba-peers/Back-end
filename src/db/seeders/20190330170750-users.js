'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('users', [{
        email: 'badraih@gmail.com',
        hashed_password:'1234',
        updated_at: new Date(),
        created_at: new Date()
      },
      {
        email: 'asma@gmail.com',
        hashed_password:'1234',
        updated_at: new Date(),
        created_at: new Date()
      }
    
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
       */
      return queryInterface.bulkDelete('users', null, {});
   
  }
};
