const { Model, DataTypes } = require('sequelize');
const { GOS_TABLE } = require('../go.model');
const { USERS_TABLE } = require('../users.model');

const USER_GO_TABLE = 'user_go';

const UserGoSchema = {
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
  total: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  paid: {
    allowNull: true,
    type: DataTypes.INTEGER
  },
  guide: {
    allowNull: true,
    type: DataTypes.STRING
  }
}

class UserGo extends Model {
  static associate(models) {
    this.hasMany(models.UserPurchase, {
      as: 'userPurchase',
      foreignKey: 'userGoId'
    });
    this.hasMany(models.UserGoPayment, {
      as: 'userGoPayment',
      foreignKey: 'userGoId'
    });
    this.belongsTo(models.User, {as: 'user'});
    this.belongsTo(models.Go, {as: 'go'});

  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_GO_TABLE,
      modelName: 'UserGo',
      timestamps: false
    }
  }
}

module.exports = { USER_GO_TABLE, UserGoSchema, UserGo };
