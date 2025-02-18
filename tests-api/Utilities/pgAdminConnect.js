
const { Client } = require('pg');

 async  function getpgAdminConnection() {
  const connectionString = 'postgres://dbro:test_2@grays-pg-rds-uat.cluster-cch5oi4rybnr.ap-southeast-2.rds.amazonaws.com:5432/userhub';
  
  try {
    const client = new Client({ connectionString });
    await client.connect();
    return client;
    

  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
    throw error;
  } 
  }
  module.exports = getpgAdminConnection;