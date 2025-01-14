"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Collection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Collection.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "users",
      });
      Collection.hasMany(models.Tasks, {
        foreignKey: "collections_id",
        as: "tasks",
      });
    }
  }
  Collection.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
          notEmpty: true, 
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Collection",
      tableName: "collections"
    }
  );
  return Collection;
};
