'use strict';
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      },
      birthDate: {
        type: Sequelize.DATE
      },
      username: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      passwordChangedAt: {
        type: Sequelize.DATE
      },
      passwordResetExpires: {
        type: Sequelize.DATE
      },
      passwordResetToken: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.ENUM,
        values: ['super user', 'super admin', 'travel admin', 'travel team member',
          'manager', 'requester', 'accommodation supplier']
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
