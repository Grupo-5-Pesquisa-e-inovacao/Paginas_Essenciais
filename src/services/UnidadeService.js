const connection = require('../db');
const db = require('../db');

function cadastrar(rua, numero, complemento, cep, nomeUnidade, representante, email, senha, fkProvedora) {

    console.log("function cadastrar():", rua, numero, complemento, cep, nomeUnidade, representante, email, senha, fkProvedora);
  
    var instrucaoUsuario = `INSERT INTO unidadeProvedora (rua, numero, complemento, cep, nomeUnidade, representante, email, senha, fkProvedora) VALUES (?,?,?,?,?,?,?)`;
  
    console.log("Executando a instrução SQL:");
  
    return new Promise((resolve, reject) => {
      connection.query(instrucaoUsuario, [rua, numero, complemento, cep, nomeUnidade, representante, email, senha, fkProvedora], (error, results) => {
        if (error) {
          console.log(error);
          console.log("\nHouve um erro ao realizar o cadastro! Erro: ", error.sqlMessage);
          reject(error);
        } else {
          const idUsuarioInserido = results.insertId;
          console.log(`ID do usuário inserido: ${idUsuarioInserido}`);
          resolve(results);
        }
      });
    });
  }


  
  function excluir(idunidadeProvedora) {
    var instrucao = `
      DELETE FROM unidadeprovedora WHERE idunidadeProvedora = ?;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
  
    return new Promise((resolve, reject) => {
      db.query(instrucao, [idunidadeProvedora], (error, results, fields) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  function atualizar(idunidadeProvedora,nomeUnidade,cep,rua,complemento,numero,senha) {
    console.log("function atualizar():", nomeUnidade,cep,rua,complemento,numero,senha, idunidadeProvedora,);
  
    var instrucaoUsuario = `
      UPDATE unidadeprovedora
      SET nomeUsuario = ?, cep = ?, rua = ?, complemento = ?, numero = ?, senha = ? 
      WHERE idunidadeProvedora = ?;
    `;
  
    console.log("Executando a instrução SQL:");
  
    return new Promise((resolve, reject) => {
      connection.query(instrucaoUsuario, [nomeUnidade,cep,rua,complemento,numero,senha,idunidadeProvedora ], (error, results) => {
        if (error) {
          console.log(error);
          console.log("\nHouve um erro ao realizar a atualização! Erro: ", error.sqlMessage);
          reject(error);
        } else {
          console.log(`Registro com ID ${idunidadeProvedora} atualizado com sucesso.`);
          resolve(results);
        }
      });
    });
  }
  
  const sql = require('mssql');

  function visualizarPorId(idunidadeProvedora) {
    var instrucao = `
      SELECT * FROM unidadeProvedora
      JOIN usuario ON usuario.fkUnidade = unidadeProvedora.idUnidadeProvedora
      WHERE unidadeProvedora.idUnidadeProvedora = @idunidadeProvedora;
    `;
  
    console.log("Executando a instrução SQL:");
  
    return new Promise((resolve, reject) => {
      const request = connection.request();
      request.input('idunidadeProvedora', sql.Int, idunidadeProvedora);
  
      request.query(instrucao, (error, results) => {
        if (error) {
          console.log(error);
          console.log("\nHouve um erro ao buscar os dados! Erro: ", error.sqlMessage);
          reject(error);
        } else {
          resolve(results.recordset);
        }
      });
    });
  }
  
  

  

   module.exports = {
     cadastrar,
     excluir,
     atualizar,
     visualizarPorId
 }