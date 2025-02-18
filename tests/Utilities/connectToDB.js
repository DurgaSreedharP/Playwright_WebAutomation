const mssql = require('mssql');
const { test } = require('@playwright/test');

const config = {
  server: 'SYD-UAT-GDBL.PP-GOL.LOCAL',
  user: 'FunctionalTests',
  password: 'mkcODWnx6UKszBihvHVe',
  database: 'GET',
  options:{

    port: 1433,
    encrypt: true, // Required for TLS connection
    trustServerCertificate: true
  }
};

async function getConnection() {
    try {
        const pool = await new mssql.connect(config);
        return pool;
    } catch (error) {
        console.error('Error creating connection pool:', error);
        throw error; // Re-throw for handling in tests
    }
}

module.exports = getConnection;