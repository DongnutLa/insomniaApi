const { Model, DataTypes } = require('sequelize');
const { ROLES_TABLE } = require('../roles.model');
const { PERMISSIONS_TABLE } = require('../permissions.model');


const ROLE_PERMISSION_TABLE = 'role_permission';

const RolePermissionSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  roleId: {
    field: 'role_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ROLES_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  permissionId: {
    field: 'permission_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PERMISSIONS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
}

class RolePermission extends Model {
  static associate(models) {

  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: ROLE_PERMISSION_TABLE,
      modelName: 'RolePermission',
      timestamps: false
    }
  }
}

module.exports = { ROLE_PERMISSION_TABLE, RolePermissionSchema, RolePermission };
