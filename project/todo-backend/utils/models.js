const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('./db')

class Todo extends Model { }
Todo.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  todo: {
    type: DataTypes.STRING(140),
    allowNull: false,

  },
  done: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'todo',
});

module.exports = {
  Todo
}