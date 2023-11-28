const sql = require('mssql');

const config = {
  user: 'sa',
  password: 'SASenha123',
  server: '3.233.52.99',
  port: 1433,
  database: 'camelTech',
  options: {
    encrypt: false,
    trustServerCertificate: true, // Desabilita a verificação do certificado
  },
};

const pool = new sql.ConnectionPool(config);
const connection = pool.connect();

pool.on('error', err => {
  console.error('Erro na pool de conexão:', err.message);
});

connection.then(() => {
  console.log('Conectado ao Banco de Dados: camelTech');
}).catch(error => {
  console.error('Erro ao conectar ao banco de dados:', error.message);
});

module.exports = pool;
