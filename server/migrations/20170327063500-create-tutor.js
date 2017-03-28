'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Tutors', {
      user_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fee_per_hour: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      subject: {
        allowNull: false,
        defaultValue: "",
        type: Sequelize.STRING
      },
      min_free_hours: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Tutors');
  }
};