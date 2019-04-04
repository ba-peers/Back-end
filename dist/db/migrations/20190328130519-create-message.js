'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('messages', {
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
      memberName: {
        field: "member_name",
        type: Sequelize.STRING,
        onDelete: "CASCADE",
        references: {
          model: "members"
        }
      },
      createdAt: {
        field: "created_at",
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: "updated_at",
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('messages');
  }
};