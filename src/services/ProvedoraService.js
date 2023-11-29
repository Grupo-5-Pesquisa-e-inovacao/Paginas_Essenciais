const connection = require("../db");
const db = require("../db");


const mssql = require('mssql');



function cadastrar(razaoSocial, email, senha, cnpj) {
  console.log("function cadastrar():", razaoSocial, email, senha, cnpj);

  var instrucaoUsuario = `INSERT INTO provedora (razaoSocial,email,senha,cnpj) VALUES (?,?,?,?)`;

  console.log("Executando a instrução SQL:");

  return new Promise((resolve, reject) => {
    connection.query(
      instrucaoUsuario,
      [razaoSocial, email, senha, cnpj],
      (error, results) => {
        if (error) {
          console.log(error);
          console.log(
            "\nHouve um erro ao realizar o cadastro! Erro: ",
            error.sqlMessage
          );
          reject(error);
        } else {
          const idUsuarioInserido = results.insertId;
          console.log(`ID do usuário inserido: ${idUsuarioInserido}`);
          resolve(results);
        }
      }
    );
  });
}


async function entrar(email, senha) {
  try {
    const instrucao = 'SELECT usuario.*, provedora.*, unidadeProvedora.*  FROM usuario LEFT JOIN provedora ON usuario.fkProvedora = provedora.idProvedora LEFT JOIN unidadeProvedora ON usuario.fkUnidade = unidadeProvedora.idunidadeProvedora WHERE email = @email AND senha = @senha';
    const request = connection.request();
    
    request.input('email', mssql.VarChar, email);
    request.input('senha', mssql.VarChar, senha);

    const resultado = await request.query(instrucao);
    return resultado.recordset;
  } catch (error) {
    console.error("Erro ao tentar entrar:", error);
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
  console.log(
    "function atualizar():",
    id,
    email,
    senha,
    nomeFantasia,
    razaoSocial
  );

  var instrucaoUsuario = `
      UPDATE provedora
      SET email = ?, senha = ?, nomeFantasia = ?, razaoSocial = ?
      WHERE idProvedora = ?;
    `;

  console.log("Executando a instrução SQL: \n" + instrucaoUsuario);

  return new Promise((resolve, reject) => {
    connection.query(
      instrucaoUsuario,
      [email, senha, nomeFantasia, razaoSocial, id],
      (error, results) => {
        if (error) {
          console.log(error);
          console.log(
            "\nHouve um erro ao realizar a atualização! Erro: ",
            error.sqlMessage
          );
          reject(error);
        } else {
          console.log(`Registro com ID ${id} atualizado com sucesso.`);
          resolve(results);
        }
      }
    );
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
        console.log(
          "\nHouve um erro ao buscar os dados! Erro: ",
          error.sqlMessage
        );
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
  visualizarPorId,
};
