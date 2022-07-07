const { Model, DataTypes } = require('sequelize');
const { GOS_TABLE } = require('./go.model');

const GOS_PAYMENT_INFO_TABLE = 'gos_payment_info';

const GosPaymentInfoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
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
  account: {
    allowNull: false,
    type: DataTypes.STRING
  },
  bank: {
    allowNull: false,
    type: DataTypes.STRING
  },
  owner: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    field: 'created_at',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: new Date()
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'UNPUBLISHED'
  },
  isDeleted: {
    field: 'is_deleted',
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}

class GosPaymentInfo extends Model {
  static associate(models) {
    this.belongsTo(models.Go, {as: 'go'});
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: GOS_PAYMENT_INFO_TABLE,
      modelName: 'GosPaymentInfo',
      timestamps: false,
    }
  }
}

module.exports = { GOS_PAYMENT_INFO_TABLE, GosPaymentInfoSchema, GosPaymentInfo };
