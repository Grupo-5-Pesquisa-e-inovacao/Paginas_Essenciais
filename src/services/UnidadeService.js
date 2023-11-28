const connection = require('../db');
const db = require('../db');

const sql = require('mssql');




async function cadastrar(rua, numero, complemento, cep, nomeUnidade, representante, email, senha, fkProvedora) {
  console.log("function cadastrar():", rua, numero, complemento, cep, nomeUnidade, representante, email, senha, fkProvedora);

  const instrucaoUsuario = `
  INSERT INTO unidadeProvedora (rua, numero, complemento, cep, nomeUnidade, fkProvedora)
    VALUES (@rua, @numero, @complemento, @cep, @nomeUnidade, @fkProvedora);
    
    INSERT INTO usuario (nome, email, senha, fkUnidade)
    VALUES (@representante, @email, @senha, SCOPE_IDENTITY());
`;

  console.log("Executando a instrução SQL:");

  try {
    // Usar a pool de conexão já criada
    const request = connection.request();

    // Adicionar parâmetros à solicitação
    request.input('rua', sql.VarChar, rua);
    request.input('numero', sql.VarChar, numero);
    request.input('complemento', sql.VarChar, complemento);
    request.input('cep', sql.VarChar, cep);
    request.input('nomeUnidade', sql.VarChar, nomeUnidade);
    request.input('representante', sql.VarChar, representante);
    request.input('email', sql.VarChar, email);
    request.input('senha', sql.VarChar, senha);
    request.input('fkProvedora', sql.Int, fkProvedora);

    // Executar a instrução SQL
    const resultado = await request.query(instrucaoUsuario);
    console.log("Resultado:", resultado);

    return resultado;
  } catch (error) {
    console.error('Erro ao executar a consulta:', error);
    throw error; // Rejeitar a Promise para indicar falha
  }
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

  async function atualizar(idunidadeProvedora, nomeUnidade, cep, rua, complemento, numero, senha) {
    console.log("function atualizar():", nomeUnidade, cep, rua, complemento, numero, senha, idunidadeProvedora);
  
    const instrucaoUsuario = `
      UPDATE unidadeProvedora
      SET nomeUnidade = @nomeUnidade, cep = @cep, rua = @rua, complemento = @complemento, numero = @numero, senha = @senha
      WHERE idunidadeProvedora = @idunidadeProvedora;
    `;
  
    console.log("Executando a instrução SQL:");
  
    try {
      const request = connection.request();
      request.input('nomeUnidade', sql.VarChar, nomeUnidade);
      request.input('cep', sql.VarChar, cep);
      request.input('rua', sql.VarChar, rua);
      request.input('complemento', sql.VarChar, complemento);
      request.input('numero', sql.VarChar, numero);
      request.input('senha', sql.VarChar, senha);
      request.input('idunidadeProvedora', sql.Int, idunidadeProvedora);
  
      const resultado = await request.query(instrucaoUsuario);
      console.log(`Registro com ID ${idunidadeProvedora} atualizado com sucesso.`);
      return resultado;
    } catch (error) {
      console.error('Erro ao executar a consulta:', error);
      throw error;
    }
  }
  
  

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