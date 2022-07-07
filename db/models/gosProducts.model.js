const { Model, DataTypes } = require('sequelize');
const { GOS_TABLE } = require('./go.model');

const GOS_PRODUCTS_TABLE = 'gos_products';

const GosProductsSchema = {
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
  title: {
    allowNull: false,
    type: DataTypes.STRING
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  includePoster: {
    field: 'include_poster',
    allowNull: false,
    type: DataTypes.BOOLEAN
  },
  posterPrice: {
    field: 'poster_price',
    allowNull: true,
    type: DataTypes.INTEGER
  },
  productImage: {
    field: 'product_image',
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

class GosProducts extends Model {
  static associate(models) {
    this.belongsTo(models.Go, {as: 'go'});
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: GOS_PRODUCTS_TABLE,
      modelName: 'GosProducts',
      timestamps: false,
    }
  }
}

module.exports = { GOS_PRODUCTS_TABLE, GosProductsSchema, GosProducts };
