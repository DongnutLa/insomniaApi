const boom = require('@hapi/boom');
const { Op } = require('sequelize');

const { models } = require('../libs/sequelize');

class GoProductsService {

  constructor(){

  }

  async create(data, req){
    let fileUrl = '';
    if (req.file) {
      fileUrl = `${req.protocol}://${req.get('host')}/files/products/${req.file.filename}`
      data.productImage = fileUrl;
    }

    const goProduct = await models.GosProducts.create(data);
    return goProduct;
  }

  async find(params){
    const options = {
      where: {}
    }
    params.includeDeleted = params.includeDeleted == 'true' ? true : false;

    if (!params.includeDeleted) {
      var isDeleted = {
        isDeleted: false
      }
    }
    options.where = {
      [Op.and]: [
        isDeleted,
      ]
    }
    const goProducts = await models.GosProducts.findAll(options);
    return goProducts;
  }

  async findOne(id){
    const goProduct = await models.GosProducts.findByPk(id);
    if (!goProduct) {
      throw boom.notFound('Product not found');
    }

    return goProduct;
  }

  async update(id, changes){
    const goProduct = await this.findOne(id);
    const rta = await goProduct.update(changes);
    return rta;
  }
}

module.exports = GoProductsService;
