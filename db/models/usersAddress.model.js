const { Model, DataTypes } = require('sequelize');
const { USERS_TABLE } = require('./users.model');

const USERS_ADDRESS_TABLE = 'users_address';

const UserAddressSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USERS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  city: {
    allowNull: false,
    type: DataTypes.STRING
  },
  neighborhood: {
    allowNull: false,
    type: DataTypes.STRING
  },
  address: {
    allowNull: false,
    type: DataTypes.STRING
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING
  },
  socialNetwork: {
    field: 'social_network',
    allowNull: true,
    type: DataTypes.STRING
  },
  additionalData: {
    field: 'additional_data',
    allowNull: true,
    type: DataTypes.TEXT
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

class UserAddress extends Model {
  static associate(models) {
    this.belongsTo(models.User, {as: 'user'});
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USERS_ADDRESS_TABLE,
      modelName: 'UserAddress',
      timestamps: false
    }
  }
}

module.exports = { USERS_ADDRESS_TABLE, UserAddressSchema, UserAddress };
