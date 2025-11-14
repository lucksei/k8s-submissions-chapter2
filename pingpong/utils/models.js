const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('./db')

class PingPong extends Model { }
PingPong.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'ping_pong',
});

module.exports = {
  PingPong
}