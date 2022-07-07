const { Client } = require('pg');

async function getConnection(){
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'dongnut',
    password: 'lusho',
    database: 'insomniaDb'
  });
  await client.connect();
  return client;
}

module.exports = getConnection;
