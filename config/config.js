require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUser:  process.env.DB_USER,
  dbPassword:  process.env.DB_PASSWORD,
  dbHost:  process.env.DB_HOST,
  dbName:  process.env.DB_NAME,
  dbPort:  process.env.DB_PORT,
  dbUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  jwtSecet: process.env.JWT_SECRET,
  smtpEmail: process.env.SMTP_EMAIL,
  smtpPassword: process.env.SMTP_PASSWORD
}

const permissions = {
  VIEW_GO: 'VIEW_GO',
  EDIT_GO: 'EDIT_GO',
  DELETE_GO: 'DELETE_GO',

  VIEW_GO_DETAILS: 'VIEW_GO_DETAILS', //STORE
  EDIT_GO_DETAILS: 'EDIT_GO_DETAILS', //STORE
}

const mails = {
  USER_CREATED: 'USER_CREATED',
  USER_GO_CREATED: 'USER_GO_CREATED'
}

module.exports = { config, permissions, mails };
