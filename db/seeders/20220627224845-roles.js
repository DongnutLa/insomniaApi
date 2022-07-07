'use strict';

const { ROLE_PERMISSION_TABLE } = require('../models/joins/role-permission.model');
const { PERMISSIONS_TABLE } = require('../models/permissions.model');
const { ROLES_TABLE } = require('../models/roles.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert(ROLES_TABLE, [
      {
        role: 'admin',
        description: 'Has all access'
      },
      {
        role: 'store',
        description: 'Can edit go data'
      },
      {
        role: 'user',
        description: 'Can consult'
      },
      {
        role: 'guest',
        description: 'User not logged in'
      }
    ]);

    await queryInterface.bulkInsert(PERMISSIONS_TABLE, [
      {permission: 'VIEW_GO'}, {permission: 'EDIT_GO'}, {permission: 'DELETE_GO'},
      {permission: 'VIEW_GO_DETAILS'}, {permission: 'EDIT_GO_DETAILS'},
    ]);

    await queryInterface.bulkInsert(ROLE_PERMISSION_TABLE, [
      { role_id: 1, permission_id: 1 },
      { role_id: 1, permission_id: 2 },
      { role_id: 1, permission_id: 3 },
      { role_id: 1, permission_id: 4 },
      { role_id: 1, permission_id: 5 },
      { role_id: 2, permission_id: 1 },
      { role_id: 2, permission_id: 4 },
      { role_id: 2, permission_id: 5 },
      { role_id: 3, permission_id: 1 },
      { role_id: 4, permission_id: 1 },
    ])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete(ROLES_TABLE, null, {});
    await queryInterface.bulkDelete(PERMISSIONS_TABLE, null, {});
    await queryInterface.bulkDelete(ROLE_PERMISSION_TABLE, null, {});
  }
};
