'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,

    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    instanceMethods: {
      isTutor: function() {
        return this.role.toLowerCase() === 'tutor';
      },

      isTutee: function() {
        return this.role.toLowerCase() === 'tutee';
      },
    }
  });

  return User;
};