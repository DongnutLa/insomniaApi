const { Model, DataTypes } = require('sequelize');
const { USER_GO_TABLE } = require('./user-go.model');

const USER_GO_PAYMENT_TABLE = 'user_go_payment';

const UserGoPaymentSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
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
  payment: {
    allowNull: false,
    type: DataTypes.STRING
  },
  attachment: {
    allowNull: false,
    type: DataTypes.STRING
  }
}

class UserGoPayment extends Model {
  static associate(models) {
    this.belongsTo(models.UserGo, {as: 'userGo'});

  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_GO_PAYMENT_TABLE,
      modelName: 'UserGoPayment',
      timestamps: false
    }
  }
}

module.exports = { USER_GO_PAYMENT_TABLE, UserGoPaymentSchema, UserGoPayment };
