const connection = require("../db");
const db = require("../db");


const sql = require('mssql');

const mssql = require('mssql');










function cadastrarUser(email, senha, cpf, nome) {


  return db.connect()
    .then(() => {
      const request = new sql.Request(db);

      // Obter o último ID da tabela provedora
      return request.query('SELECT MAX(idProvedora) AS ultimoId FROM Provedora');
    })
    .then(result => {
      // Armazenar o último ID da tabela provedora
      provedoraId = result.recordset[0].ultimoId;

      // Iniciar uma nova solicitação para inserir o usuário
      const request = new sql.Request(db);

      // Inserir o usuário na tabela Usuario
      return request.input('email', sql.VarChar, email)
        .input('senha', sql.VarChar, senha)
        .input('cpf', sql.VarChar, cpf)
        .input('nome', sql.VarChar, nome)
        .input('fkProvedora', sql.Int, provedoraId)
        .input('fkTipoUsuario', sql.Int, 1)
        .input('fkUnidade', sql.Int, null)
        .query('INSERT INTO Usuario (email, senha, cpf, nome, fkProvedora, fkTipoUsuario, fkUnidade) VALUES (@email, @senha, @cpf, @nome, @fkProvedora, @fkTipoUsuario, @fkUnidade)');
    })
    .then(result => {
      // Incluir o provedoraId no resultado para retornar ao cliente
      
      idProvedora = provedoraId
      return { provedoraId, result };

    })
    .catch(erro => {
      console.error('Erro ao cadastrar usuário:', erro);
      throw erro;
    });
}





function cadastrarProvedora(razaoSocial, cnpj) {
  return db.connect()
      .then(() => {
          var request = new sql.Request(db);
          request.input('razaoSocial', sql.VarChar, razaoSocial);
          request.input('cnpj', sql.VarChar, cnpj);

          return request.query('INSERT INTO provedora (razaoSocial, cnpj) VALUES (@razaoSocial, @cnpj)');
      })
      .catch(erro => {
          console.error('Erro ao cadastrar a provedora:', erro);
          console.log(erro);
          throw erro;
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
      });
    });
  }
  function visualizarPorId(id) {
    return db.connect()
        .then(() => {
            var request = new sql.Request(db);
            request.input('idProvedora', sql.Int, id);
            console.log('ID recebido:', id);


            return request.query('SELECT * FROM provedora WHERE idProvedora = @idProvedora');
        })
        .catch(erro => {
            console.error('Erro ao trazer dados da provedora:', erro);
            console.log(erro);
            throw erro;
        });
}


function visualizarUltimo() {
  return db.connect()
    .then(() => {
      var request = new sql.Request(db);

      return request.query('SELECT TOP 1 * FROM provedora ORDER BY idProvedora DESC');
    })
    .then(result => {
      if (result.recordset.length > 0) {
        const ultimoIdProvedora = result.recordset[0].idProvedora;
        console.log('Último ID daa provedora:', ultimoIdProvedora);
        return ultimoIdProvedora;
      } else {
        console.log('Nenhum registro encontrado na tabela provedora.');
        return null; // ou outro valor padrão, dependendo da lógica do seu aplicativo
      }
    })
    .catch(erro => {
      console.error('Erro ao obter o último ID da provedora:', erro);
      throw erro;
    });
}


  
  
  

  

  module.exports = {
    cadastrarUser,
    cadastrarProvedora,
    entrar,
    excluir,
    atualizar,
    visualizarPorId,
    visualizarUltimo}
