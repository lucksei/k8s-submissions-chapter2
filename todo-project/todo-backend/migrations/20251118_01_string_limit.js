const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.changeColumn('todos', 'todo', {
      type: DataTypes.STRING(140),
      allowNull: false,
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.changeColumn('todos', 'todo', {
      type: DataTypes.STRING,
      allowNull: false,
    })
  },
}