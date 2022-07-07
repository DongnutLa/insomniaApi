'use strict';

const { ROLES_TABLE, RoleSchema } = require('../models/roles.model');
const { PERMISSIONS_TABLE, PermissionSchema } = require('../models/permissions.model');
const { USERS_TABLE, UserSchema } = require('../models/users.model');
const { USERS_ADDRESS_TABLE, UserAddressSchema } = require('../models/usersAddress.model');
const { ROLE_PERMISSION_TABLE, RolePermissionSchema } = require("../models/joins/role-permission.model");
const { TEMPLATES_TABLE, TemplateSchema } = require('../models/templates.model');
const { GOS_TABLE, GoSchema } = require('../models/go.model');
const { GOS_PAYMENT_INFO_TABLE, GosPaymentInfoSchema } = require('../models/gosPaymentInfo.model');
const { GOS_PRODUCTS_TABLE, GosProductsSchema } = require('../models/gosProducts.model');
const { USER_GO_TABLE, UserGoSchema } = require("../models/joins/user-go.model");
const { USER_GO_PAYMENT_TABLE, UserGoPaymentSchema } = require("../models/joins/user-go-payment.model");
const { USER_PURCHASE_TABLE, UserPurchaseSchema } = require("../models/joins/user-purchase.model");

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ROLES_TABLE, RoleSchema);
    await queryInterface.createTable(PERMISSIONS_TABLE, PermissionSchema);
    await queryInterface.createTable(USERS_TABLE, UserSchema);
    await queryInterface.createTable(USERS_ADDRESS_TABLE, UserAddressSchema);
    await queryInterface.createTable(ROLE_PERMISSION_TABLE, RolePermissionSchema);
    await queryInterface.createTable(TEMPLATES_TABLE, TemplateSchema);
    await queryInterface.createTable(GOS_TABLE, GoSchema);
    await queryInterface.createTable(GOS_PAYMENT_INFO_TABLE, GosPaymentInfoSchema);
    await queryInterface.createTable(GOS_PRODUCTS_TABLE, GosProductsSchema);
    await queryInterface.createTable(USER_GO_TABLE, UserGoSchema);
    await queryInterface.createTable(USER_PURCHASE_TABLE, UserPurchaseSchema);
    await queryInterface.createTable(USER_GO_PAYMENT_TABLE, UserGoPaymentSchema);

  },

  async down (queryInterface) {
    await queryInterface.dropTable(ROLE_PERMISSION_TABLE);
    await queryInterface.dropTable(PERMISSIONS_TABLE);
    await queryInterface.dropTable(GOS_PAYMENT_INFO_TABLE);
    await queryInterface.dropTable(TEMPLATES_TABLE);
    await queryInterface.dropTable(USER_GO_PAYMENT_TABLE);
    await queryInterface.dropTable(USER_PURCHASE_TABLE);
    await queryInterface.dropTable(USER_GO_TABLE);
    await queryInterface.dropTable(GOS_PRODUCTS_TABLE);
    await queryInterface.dropTable(GOS_TABLE);
    await queryInterface.dropTable(USERS_ADDRESS_TABLE);
    await queryInterface.dropTable(USERS_TABLE);
    await queryInterface.dropTable(ROLES_TABLE);
  }
};
