const { Model, DataTypes } = require('sequelize');

const PERMISSIONS_TABLE = 'permissions';

const PermissionSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  permission: {
    allowNull: false,
    type: DataTypes.STRING
  }
}

class Permission extends Model {
  static associate(models) {

  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: PERMISSIONS_TABLE,
      modelName: 'Permission',
      timestamps: false
    }
  }
}

module.exports = { PERMISSIONS_TABLE, PermissionSchema, Permission };
