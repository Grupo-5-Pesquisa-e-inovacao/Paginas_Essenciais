const sql = require('mssql');

const config = {
  user: 'sa',
  password: 'SASenha123',
  server: '3.233.52.99',
  port: 1433,
  database: 'camelTech',
  options: {
    encrypt: true,
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

// var mysql = require("mysql2");

// // CONEXÃO DO SQL SERVER - AZURE (NUVEM)


// // CONEXÃO DO MYSQL WORKBENCH (LOCAL)
// var mySqlConfig = {
//     host: "localhost",
//     database: "camelTech",
//     user: "root",
//     password: "senhaDificil235813",
// };


// function executar(instrucao) {
//   // VERIFICA A VARIÁVEL DE AMBIENTE SETADA EM app.js
//   if (process.env.AMBIENTE_PROCESSO == "producao") {
//       return new Promise(function (resolve, reject) {
//           sql.connect(sqlServerConfig).then(function () {
//               return sql.query(instrucao);
//           }).then(function (resultados) {
//               console.log(resultados);
//               resolve(resultados.recordset);
//           }).catch(function (erro) {
//               reject(erro);
//               console.log('ERRO: ', erro);
//           });
//           sql.on('error', function (erro) {
//               return ("ERRO NO SQL SERVER (Azure): ", erro);
//           });
//       });
//   } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
//       return new Promise(function (resolve, reject) {
//           var conexao = mysql.createConnection(mySqlConfig);
//           conexao.connect();
//           conexao.query(instrucao, function (erro, resultados) {
//               conexao.end();
//               if (erro) {
//                   reject(erro);
//               }
//               console.log(resultados);
//               resolve(resultados);
//           });
//           conexao.on('error', function (erro) {
//               return ("ERRO NO MySQL WORKBENCH (Local): ", erro.sqlMessage);
//           });
//       });
//   } else {
//       return new Promise(function (resolve, reject) {
//           console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
//           reject("AMBIENTE NÃO CONFIGURADO EM app.js")
//       });
//   }
// }

// module.exports = {
//   executar
// }