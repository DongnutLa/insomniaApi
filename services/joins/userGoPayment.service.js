const boom = require('@hapi/boom');

const { models } = require('../../libs/sequelize');

class UserGoPaymentsService {

  constructor(){

  }

  async create(data, req){
    let fileUrl = '';
    if (req.file) {
      fileUrl = `${req.protocol}://${req.get('host')}/files/goPayments/${req.file.filename}`
      data.attachment = fileUrl;
    }

    const userGoPayment = await models.UserGoPayment.create(data);
    return userGoPayment;
  }

  async find(){
    const userGoPayments = await models.UserGoPayment.findAll();
    return userGoPayments;
  }

  async findOne(id){
    const userGoPayment = await models.UserGoPayment.findByPk(id);
    if (!userGoPayment) {
      throw boom.notFound('userGoPayment not found');
    }
    return userGoPayment;
  }

  async findByParams(params) {
    let where = {}
    if(params.userGoId) {
      where = {...where, userId: params.userId};
    }

    const userGoPayment = await models.UserGoPayment.findAll({
      where
    })
    return userGoPayment;
  }

  async update(id, changes){
    const go = await this.findOne(id);
    const rta = await go.update(changes);
    return rta;
  }
}

module.exports = UserGoPaymentsService;
