const { Model, DataTypes } = require('sequelize');

const GOS_TABLE = 'gos';

const GoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  deadline: {
    allowNull: false,
    type: DataTypes.DATE
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

class Go extends Model {
  static associate(models) {
    this.hasMany(models.GosPaymentInfo, {
      as: 'GoPaymentInfo',
      foreignKey: 'goId'
    });
    this.hasMany(models.GosProducts, {
      as: 'GoProducts',
      foreignKey: 'goId'
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: GOS_TABLE,
      modelName: 'Go',
      timestamps: false,
    }
  }
}

module.exports = { GOS_TABLE, GoSchema, Go };
