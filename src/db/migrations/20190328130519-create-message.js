'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dateCol: {
        type: Sequelize.DATE
      },
      timeCol: {
        type: Sequelize.TIME
      },
      body: {
        type: Sequelize.STRING
      },
      memberId: {
        field: "member_id",
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "members",
        }
      },
      createdAt: {
        field: "create_id",
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: "update_id",
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Messages');
  }
};