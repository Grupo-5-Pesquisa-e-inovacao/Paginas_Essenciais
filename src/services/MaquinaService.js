const db = require('../db');
const connection = require('../db');

function cadastrar(responsavel, registro, processadorMin, processadorMax, disco, ram, rede ) {

    console.log("function cadastrar():", responsavel, registro, processadorMin, processadorMax, disco, ram, rede);
  
    var instrucaoUsuario = `INSERT INTO servidor (responsavel, registro,processadorMin, processadorMax, disco, ram, rede, fkUnidade) VALUES (?,?,?,?,?,?,?,?)`;
    
  
    console.log("Executando a instrução SQL:");
  
    return new Promise((resolve, reject) => {
      connection.query(instrucaoUsuario, [responsavel, registro, processadorMin, processadorMax, disco, ram, rede,1], (error, results) => {
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

  function update(responsavel, registro, processadorMin, processadorMax, disco, ram, rede, id) {
    console.log("function update():", responsavel, registro, processadorMin, processadorMax, disco, ram, rede,id);

    var instrucaoUsuario = `
      UPDATE servidor
      SET responsavel = ?, registro = ?, processadorMin = ?, processadorMax = ?, disco = ?, ram = ?, rede = ?
      WHERE idServidor = ?;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoUsuario);

    return new Promise((resolve, reject) => {
        connection.query(instrucaoUsuario, [responsavel, registro, processadorMin, processadorMax, disco, ram, rede, id], (error, results) => {
            if (error) {
                console.log(error);
                console.log("\nHouve um erro ao realizar a atualização! Erro: ", error.sqlMessage);
                reject(error);
            } else {
                // Verifica se pelo menos uma linha foi afetada pela atualização
                if (results.affectedRows > 0) {
                    console.log(`Registro com responsável ${responsavel} atualizado com sucesso.`);
                    resolve(true); // Atualização bem-sucedida
                } else {
                    console.log(`Registro com responsável ${responsavel} não encontrado.`);
                    resolve(false); // Nenhum registro foi encontrado para atualizar
                }
            }
        });
    });
}

function deletar(responsavel) {
    var instrucao1=`
        DELETE FROM configuracao WHERE fkServidor = 1;
    `
    var instrucao2 = `
      DELETE FROM servidor WHERE idServidor = x;
    `;
    console.log("Executando a instrução SQL: \n"+instrucao1);
    console.log("Executando a instrução SQL: \n"+instrucao2);
  
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
module.exports = {
    cadastrar,
    update,
    deletar,
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
