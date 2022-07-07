const { Model, DataTypes } = require('sequelize');

const ROLES_TABLE = 'roles';

const RoleSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT
  }
}

class Role extends Model {
  static associate(models) {
    this.hasMany(models.User, {
      as: 'user',
      foreignKey: 'roleId'
    });
    this.belongsToMany(models.Permission, {
      as: 'permissions',
      through: models.RolePermission,
      foreignKey: 'roleId',
      otherKey: 'permissionId'
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: ROLES_TABLE,
      modelName: 'Role',
      timestamps: false
    }
  }
}

module.exports = { ROLES_TABLE, RoleSchema, Role };
