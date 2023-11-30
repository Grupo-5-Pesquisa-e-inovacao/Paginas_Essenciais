const db = require('../db');
const connection = require('../db');
const pool = require('../db');

async function cadastrar(nomeResponsavel, numeroRegistro, frequenciaIdealProcessador, capacidadeDisco, maxUsoDisco, capacidadeRam, maxUsoRam, velocidadeDeRede) {
    try {
      const pool = db.require('./suaConexaoPool'); // Caminho para o módulo que exporta a conexão
  
      console.log("function cadastrar():", nomeResponsavel, numeroRegistro, frequenciaIdealProcessador, capacidadeDisco, maxUsoDisco, capacidadeRam, maxUsoRam, velocidadeDeRede);
  
      const request = pool.request();
      const query = `INSERT INTO servidor (nomeResponsavel, numeroRegistro, frequenciaIdealProcessador, capacidadeRam,maxUsoRam, capacidadeDisco,maxUsoDisco, velocidadeDeRede,fkUsuario) VALUES (@nomeResponsavel, @numeroRegistro, @frequenciaIdealProcessador, @capacidadeRam,@maxUsoRam, @capacidadeDisco,@maxUsoDisco, @velocidadeDeRede)`;
  
      request.input('nomeResponsavel', nomeResponsavel);
      request.input('numeroRegistro', numeroRegistro);
      request.input('frequenciaIdealProcessador', frequenciaIdealProcessador);
      request.input('capacidadeDisco', capacidadeDisco);
      request.input('maxUsoDisco', maxUsoDisco);
      request.input('capacidadeRam', capacidadeRam);
      request.input('maxUsoRam', maxUsoRam);
      request.input('velocidadeDeRede', velocidadeDeRede);
  
      const result = await request.query(query);
      console.log(`ID do usuário inserido: ${result.recordset[0].id}`); 
  
      return result;
    } catch (error) {
      console.error('Houve um erro ao realizar o cadastro!', error.message);
      throw error;
    }
  }
  

async function update(
    nomeResponsavel,
    numeroRegistro,
    frequenciaIdealProcessador,
    capacidadeDisco,
    maxUsoDisco,
    capacidadeRam,
    maxUsoRam,
    velocidadeDeRede,
    id,
    pool
  ) {
    console.log(
      "function update():",
      nomeResponsavel,
      numeroRegistro,
      frequenciaIdealProcessador,
      capacidadeDisco,
      maxUsoDisco,
      capacidadeRam,
      maxUsoRam,
      velocidadeDeRede,
      id
    );
  
    var instrucaoUsuario = `
      UPDATE servidor
      SET nomeResponsavel = @nomeResponsavel, numeroRegistro = @numeroRegistro, frequenciaIdealProcessador = @frequenciaIdealProcessador, capacidadeDisco = @capacidadeDisco, maxUsoDisco = @maxUsoDisco, capacidadeRam = @capacidadeRam, maxUsoRam = @maxUsoRam, velocidadeDeRede = @velocidadeDeRede
      WHERE idServidor = @id;
    `;
  
    const request = db.request();
    request.input("nomeResponsavel", nomeResponsavel);
    request.input("numeroRegistro", numeroRegistro);
    request.input("frequenciaIdealProcessador", frequenciaIdealProcessador);
    request.input("capacidadeDisco", capacidadeDisco);
    request.input("maxUsoDisco", maxUsoDisco);
    request.input("capacidadeRam", capacidadeRam);
    request.input("maxUsoRam", maxUsoRam);
    request.input("velocidadeDeRede", velocidadeDeRede); // Corrigindo o nome da coluna
    request.input("id", id);
  
    console.log("Executando a instrução SQL: \n" + instrucaoUsuario);
  
    try {
      const result = await request.query(instrucaoUsuario);
      if (result.rowsAffected[0] > 0) {
        console.log(`Registro com responsável ${nomeResponsavel} atualizado com sucesso.`);
        return true;
      } else {
        console.log(`Registro com responsável ${nomeResponsavel} não encontrado.`);
        return false;
      }
    } catch (error) {
      console.error("\nHouve um erro ao realizar a atualização! Erro: ", error.message);
      throw error;
    }
  }
  
  module.exports = update;
  
  

const sql = require('mssql');
function recuperarValoresDoBancoDeDados(id) {
    return new Promise(function (resolve, reject) {
        if (!id) {
            reject(new Error("ID não fornecido."));
            return;
        }

        const valor = id;
        const instrucaoUsuario = `
            SELECT * FROM servidor
            WHERE idServidor = @id;
        `;

        console.log("Executando a instrução SQL: \n" + instrucaoUsuario);

        pool.connect().then(() => {
            return pool.request()
                .input('id', sql.Int, valor) // Verifique esta linha para garantir que 'sql' esteja definido corretamente
                .query(instrucaoUsuario);
        }).then(result => {
            const resultado = result.recordset;

            if (resultado && resultado.length > 0) {
                resolve(resultado);
            } else {
                reject(new Error("Registro não encontrado."));
            }
        }).catch(err => {
            reject(err);
        });
    });
}

function excluir(id) {
    var instrucao = `DELETE FROM servidor WHERE idServidor = ?`;
    console.log("Executando a instrução SQL:\n" + instrucao);

    return new Promise((resolve, reject) => {
        db.query(instrucao, [id], (error, results, fields) => {
            if (error) {
                console.error("Erro ao excluir o registro:", error);
                reject("Erro ao excluir o registro: " + error.message);
            } else {
                if (results.affectedRows > 0) {
                    console.log("Registro excluído com sucesso.");
                    resolve("Registro excluído com sucesso.");
                } else {
                    console.log("Nenhum registro encontrado para exclusão.");
                    reject("Nenhum registro encontrado para exclusão.");
                }
            }
        });
    });
}



module.exports = {
    cadastrar,
    update,
    recuperarValoresDoBancoDeDados,
    excluir,
    buscarTudo: (codigo) => {
        return new Promise((resolver, reject) => {
            db.query('SELECT dh.* FROM dadosHardware dh INNER JOIN captura c ON dh.idDadosHardware = c.fkDados INNER JOIN servidor s ON c.fkServidor = s.idServidor WHERE s.idServidor = ?', [codigo], (error, results) => { // Chamada ao banco
                if (error) {
                    reject(error);
                } else {
                    resolver(results); // Resolver a promessa com os resultados
                }
            });
        });
    },

    buscarRam: (codigo) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT totalRam, emUsoRam FROM dadosHardware', [codigo], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    if (results.length > 0) {
                        resolve(results[0]); // Resolver a promessa com os resultados
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    },

    buscarAllDados: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM dadosHardware ORDER BY idDadosHardware DESC limit 7', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    if (results.length > 0) {
                        resolve(results); // Resolver a promessa com os resultados
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    },

    buscarCPU: (codigo) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT dh.qtdEmUso, dh.frequenciaFROM dadosHardware dh INNER JOIN captura c ON dh.idDadosHardware = c.fkDados INNER JOIN servidor s ON c.fkServidor = s.idServidor WHERE s.idServidor = ?', [codigo], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    if (results.length > 0) {
                        resolve(results[0]); // Resolver a promessa com os resultados
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }
};
