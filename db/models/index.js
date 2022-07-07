const { Role, RoleSchema } = require('./roles.model');
const { Permission, PermissionSchema } = require('./permissions.model');
const { User, UserSchema } = require('./users.model');
const { UserAddress, UserAddressSchema } = require('./usersAddress.model');
const { RolePermission, RolePermissionSchema } = require('./joins/role-permission.model');
const { Template, TemplateSchema } = require('./templates.model');

const { Go, GoSchema } = require('./go.model');
const { GosPaymentInfo, GosPaymentInfoSchema } = require('./gosPaymentInfo.model');
const { GosProducts, GosProductsSchema } = require('./gosProducts.model');

const { UserGo, UserGoSchema } = require('./joins/user-go.model');
const { UserGoPayment, UserGoPaymentSchema } = require('./joins/user-go-payment.model');
const { UserPurchase, UserPurchaseSchema } = require('./joins/user-purchase.model');


function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Role.init(RoleSchema, Role.config(sequelize));
  Permission.init(PermissionSchema, Permission.config(sequelize));
  Template.init(TemplateSchema, Template.config(sequelize));

  Go.init(GoSchema, Go.config(sequelize));
  GosPaymentInfo.init(GosPaymentInfoSchema, GosPaymentInfo.config(sequelize));
  GosProducts.init(GosProductsSchema, GosProducts.config(sequelize));

  RolePermission.init(RolePermissionSchema, RolePermission.config(sequelize));

  UserGo.init(UserGoSchema, UserGo.config(sequelize));
  UserGoPayment.init(UserGoPaymentSchema, UserGoPayment.config(sequelize));
  UserPurchase.init(UserPurchaseSchema, UserPurchase.config(sequelize));
  UserAddress.init(UserAddressSchema, UserAddress.config(sequelize));

  //Associations

  Role.associate(sequelize.models);
  User.associate(sequelize.models);

  Go.associate(sequelize.models);
  GosPaymentInfo.associate(sequelize.models);
  GosProducts.associate(sequelize.models);

  UserGo.associate(sequelize.models);
  UserGoPayment.associate(sequelize.models);
  UserPurchase.associate(sequelize.models);
  UserAddress.associate(sequelize.models);
}

module.exports = setupModels;
