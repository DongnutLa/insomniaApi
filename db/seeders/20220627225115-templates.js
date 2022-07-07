'use strict';

const { TEMPLATES_TABLE } = require("../models/templates.model");

module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert(TEMPLATES_TABLE, [
      {
        code: 'USER_CREATED',
        subject: 'Registro exitoso ✔',
        template: '<b>Te has registrado correctamente!</b>'
      }
    ]);
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete(TEMPLATES_TABLE, null, {});
  }
};
