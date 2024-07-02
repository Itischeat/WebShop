'use strict';
const {DataTypes} = require('sequelize')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("categories", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("categories")
  }
};
