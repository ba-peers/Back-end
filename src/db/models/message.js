'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    dateCol: DataTypes.DATE,
    timeCol: DataTypes.TIME,
    body: DataTypes.STRING
  }, {tableName:"messages"});
  Message.associate = function(models) {
    // associations can be defined here
    Message.belongsTo(models.Member, {
      foreignKey: "memberId",
      onDelete: "CASCADE"
    });
  };
  return Message;
};