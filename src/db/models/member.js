'use strict';
module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
    groupId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {tableName:"members"});
  Member.associate = function(models) {
    Member.belongsTo(models.Group, {
      foreignKey: "groupId",
      onDelete: "CASCADE"
    });
    
    Member.hasMany(models.Message, {
      foreignKey: "memberId",
      as: "messages"
    });
  };
  return Member;
};