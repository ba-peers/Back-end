'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("groups", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      group_key: {
        type: Sequelize.STRING
      },

      userId: {
        field: "user_id",
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "users",
        }
      },
      createdAt: {
        allowNull: false,
        field: "created_at",
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        field: "updated_at",
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("groups");
  }
};