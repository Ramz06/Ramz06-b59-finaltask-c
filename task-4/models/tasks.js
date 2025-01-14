'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tasks.belongsTo(models.Collection, {
        foreignKey: 'collections_id',
        as: 'collections'
      });
    }
  }

  Tasks.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_done: {
      type: DataTypes.BOOLEAN,
      allowNull: false, 
      defaultValue: false, 
      validate: {
        isIn: [[true, false]]
      }
    },
    collections_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Tasks',
    tableName: 'tasks', 
    timestamps: true 
  });

  return Tasks;
};
