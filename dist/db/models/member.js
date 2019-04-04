'use strict';

module.exports = function (sequelize, DataTypes) {

  var Member = sequelize.define('Member', {
    member_name: DataTypes.STRING,
    groupId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, { tableName: "members" });

  Member.associate = function (models) {
    Member.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });

    Member.belongsTo(models.Group, {
      foreignKey: "groupId",
      onDelete: "CASCADE"
    });

    Member.hasMany(models.Message, {
      foreignKey: "member_name",
      as: "messages"
    });
  };
  return Member;
};