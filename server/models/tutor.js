'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tutor = sequelize.define('Tutor', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    fee_per_hour: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    min_free_hours: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    }
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    instanceMethods: {

    },
  });
  return Tutor;
};