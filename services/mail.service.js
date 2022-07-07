const nodemailer = require('nodemailer');
const { models } = require('../libs/sequelize');

const { config } = require('../config/config');

class MailService {
  constructor () {}

  async getTemplate(code) {
    const data = await models.Template.findOne({
      where: { code }
    })
    return data.dataValues;
  }

  async sendMail(email, templateCode) {

    const template = await this.getTemplate(templateCode);

    const mail = {
      to: `${email}`, // list of receivers
      subject: template.subject, // Subject line
      html: template.template, // html body
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword
      }
    });

    try {
      await transporter.sendMail(mail);
      return true;
    } catch (error) {
      return false
    }

  }
}

module.exports = MailService;
