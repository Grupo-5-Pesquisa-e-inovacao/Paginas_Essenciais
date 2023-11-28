const connection = require('../db');
const db = require('../db');

const sql = require('mssql');
const dbConfig = require('../db');

function cadastrar(razaoSocial, email, senha, cnpj) {

    console.log("function cadastrar():",  razaoSocial, email, senha, cnpj);
  
    var instrucaoUsuario = `INSERT INTO provedora (razaoSocial,email,senha,cnpj) VALUES (?,?,?,?)`;
  
    console.log("Executando a instrução SQL:");
  
    return new Promise((resolve, reject) => {
      connection.query(instrucaoUsuario, [razaoSocial,email,senha,cnpj], (error, results) => {
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



  async function entrar(email, senha) {
    var instrucao = `
      SELECT usuario.*, provedora.*
      FROM usuario
      JOIN provedora ON usuario.fkProvedora = provedora.idProvedora
      WHERE usuario.email = @email AND usuario.senha = @senha;
    `;
  
    console.log("Executando a instrução SQL:\n" + instrucao);
  


    try {
      const request = connection.request();
        request.input('email', sql.VarChar, email)
        request.input('senha', sql.VarChar, senha)
        request.query(instrucao);

        const result = await request.query(instrucao);
    console.log("Resultado:", result);

  
      if (result.recordset.length > 0) {
        const provedoraId = result.recordset[0].idProvedora;
        const provedoraTipoUsuario = result.recordset[0].fkTipoUsuario;
  
        // Aqui você deve usar uma solução de gerenciamento de sessão do lado do servidor, como express-session
        // No exemplo, apenas retornaremos as informações
        return {
          idProvedora: provedoraId,
          fkTipoUsuario: provedoraTipoUsuario,
          userData: result.recordset,
        };
      } else {
        // Usuário não encontrado
        throw new Error('Usuário não encontrado.');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  
  
  
  

  
  function excluir(id) {
    var instrucao = `
      DELETE FROM provedora WHERE idProvedora = ?;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
  
    return new Promise((resolve, reject) => {
      db.query(instrucao, [id], (error, results, fields) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  function atualizar(id, email, senha, nomeFantasia, razaoSocial) {
    console.log("function atualizar():", id, email, senha, nomeFantasia, razaoSocial);
  
    var instrucaoUsuario = `
      UPDATE provedora
      SET email = ?, senha = ?, nomeFantasia = ?, razaoSocial = ?
      WHERE idProvedora = ?;
    `;
  
    console.log("Executando a instrução SQL: \n" + instrucaoUsuario);
  
    return new Promise((resolve, reject) => {
      connection.query(instrucaoUsuario, [email, senha, nomeFantasia, razaoSocial, id], (error, results) => {
        if (error) {
          console.log(error);
          console.log("\nHouve um erro ao realizar a atualização! Erro: ", error.sqlMessage);
          reject(error);
        } else {
          console.log(`Registro com ID ${id} atualizado com sucesso.`);
          resolve(results);
        }
      });
    });
  }
  function visualizarPorId(id) {
    var instrucao = `
      SELECT * FROM provedora WHERE idProvedora = ?;
    `;
  
    console.log("Executando a instrução SQL:");
  
    return new Promise((resolve, reject) => {
      connection.query(instrucao, [id], (error, results) => {
        if (error) {
          console.log(error);
          console.log("\nHouve um erro ao buscar os dados! Erro: ", error.sqlMessage);
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  

  

  module.exports = {
    cadastrar,
    entrar,
    excluir,
    atualizar,
    visualizarPorId
  }