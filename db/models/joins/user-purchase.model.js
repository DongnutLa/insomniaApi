const { Model, DataTypes } = require('sequelize');
const { GOS_TABLE } = require('../go.model');
const { GOS_PRODUCTS_TABLE } = require('../gosProducts.model');
const { USERS_TABLE } = require('../users.model');
const { USER_GO_TABLE } = require('./user-go.model');

const USER_PURCHASE_TABLE = 'user_purchase';

const UserPurchaseSchema = {
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
  goId: {
    field: 'go_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: GOS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: GOS_PRODUCTS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  userGoId: {
    field: 'user_go_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_GO_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
}

class UserPurchase extends Model {
  static associate(models) {
    this.belongsTo(models.User, {as: 'user'});
    this.belongsTo(models.Go, {as: 'go'});
    this.belongsTo(models.GosProducts, {as: 'product'});
    this.belongsTo(models.UserGo, {as: 'userGo'});

  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_PURCHASE_TABLE,
      modelName: 'UserPurchase',
      timestamps: false
    }
  }
}

module.exports = { USER_PURCHASE_TABLE, UserPurchaseSchema, UserPurchase };
