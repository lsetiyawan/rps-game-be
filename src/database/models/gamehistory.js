'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GameHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GameHistory.init({
    game_id: DataTypes.INTEGER,
    player: DataTypes.INTEGER,
    choice: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'GameHistory',
  });
  return GameHistory;
};