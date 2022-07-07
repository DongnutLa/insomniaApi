const { Model, DataTypes } = require('sequelize');

const TEMPLATES_TABLE = 'templates';

const TemplateSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  code: {
    allowNull: false,
    type: DataTypes.STRING
  },
  subject: {
    allowNull: false,
    type: DataTypes.STRING
  },
  template: {
    allowNull: false,
    type: DataTypes.TEXT
  }
}

class Template extends Model {
  static associate(models) {

  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: TEMPLATES_TABLE,
      modelName: 'Template',
      timestamps: false
    }
  }
}

module.exports = { TEMPLATES_TABLE, TemplateSchema, Template };
