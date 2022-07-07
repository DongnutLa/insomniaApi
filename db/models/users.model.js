const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const { ROLES_TABLE } = require('./roles.model');

const USERS_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
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
    onDelete: 'SET NULL',
    defaultValue: 1,
  },
  recoveryToken: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING
  },
  emailVerified: {
    field: 'email_verified',
    allowNull: true,
    type: DataTypes.BOOLEAN
  },
  profilePic: {
    field: 'profile_pic',
    allowNull: true,
    type: DataTypes.STRING
  },
  createdAt: {
    field: 'created_at',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: new Date()
  },
  isDeleted: {
    field: 'is_deleted',
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}

class User extends Model {
  static associate(models) {
    this.belongsTo(models.Role, {as: 'role'});
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USERS_TABLE,
      modelName: 'User',
      timestamps: false,
      hooks: {
        beforeCreate: async (user) => {
          const password = await bcrypt.hash(user.password, 10);
          user.password = password;
        },
        beforeUpdate: async (user) => {
          if (user.password !== user._previousDataValues.password) {
            const password = await bcrypt.hash(user.password, 10);
            user.password = password;
          }
        },
      }
    }
  }
}

module.exports = { USERS_TABLE, UserSchema, User };
