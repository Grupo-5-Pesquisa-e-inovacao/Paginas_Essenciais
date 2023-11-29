const db = require('../db');
const connection = require('../db');

function cadastrar(nomeResponsavel, numeroRegistro, frequenciaIdealProcessador, capacidadeDisco,maxUsoDisco,capacidadeRam,maxUsoRam, velocidaDeRede, id ) {

    console.log("function cadastrar():", nomeResponsavel, numeroRegistro, frequenciaIdealProcessador, capacidadeDisco,maxUsoDisco,capacidadeRam,maxUsoRam, velocidaDeRede);
  
    var instrucaoUsuario = `INSERT INTO servidor (nomeResponsavel, numeroRegistro, frequenciaIdealProcessador, capacidadeRam,maxUsoRam, capacidadeDisco,maxUsoDisco, velocidaDeRede,fkUsuario) VALUES (?,?,?,?,?,?,?,?,?)`;
    
  
    console.log("Executando a instrução SQL:");
  
    return new Promise((resolve, reject) => {
      connection.query(instrucaoUsuario, [nomeResponsavel, numeroRegistro, frequenciaIdealProcessador, capacidadeDisco,maxUsoDisco,capacidadeRam,maxUsoRam, velocidaDeRede,1], (error, results) => {
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

  function update(nomeResponsavel, numeroRegistro, frequenciaIdealProcessador, capacidadeDisco, maxUsoDisco, capacidadeRam, maxUsoRam, velocidaDeRede, id) {
    console.log("function update():", nomeResponsavel, numeroRegistro, frequenciaIdealProcessador, capacidadeDisco, maxUsoDisco, capacidadeRam, maxUsoRam, velocidaDeRede, id);

    var instrucaoUsuario = `
      UPDATE servidor
      SET nomeResponsavel = ?, numeroRegistro = ?, frequenciaIdealProcessador = ?, capacidadeDisco = ?, maxUsoDisco = ?, capacidadeRam = ?, maxUsoRam = ?, velocidaDeRede = ?
      WHERE idServidor = ?;
    `;

    // Converter os valores apropriados para números
    var frequenciaIdealProcessadorNum = parseFloat(frequenciaIdealProcessador);
    var velocidaDeRedeNum = parseFloat(velocidaDeRede);

    const valores = [
        nomeResponsavel, 
        `SRV${numeroRegistro}`,        
        frequenciaIdealProcessadorNum, 
        capacidadeDisco,
        maxUsoDisco,
        capacidadeRam,
        maxUsoRam, 
        velocidaDeRedeNum,
        id
    ];

    console.log("Executando a instrução SQL: \n" + instrucaoUsuario);

    return new Promise((resolve, reject) => {
        connection.query(instrucaoUsuario, valores, (error, results) => {
            if (error) {
                console.log(error);
                console.log("\nHouve um erro ao realizar a atualização! Erro: ", error.sqlMessage);
                reject(error);
            } else {
                // Verifica se pelo menos uma linha foi afetada pela atualização
                if (results.affectedRows > 0) {
                    console.log(`Registro com responsável ${nomeResponsavel} atualizado com sucesso.`);
                    resolve(true); // Atualização bem-sucedida
                } else {
                    console.log(`Registro com responsável ${nomeResponsavel} não encontrado.`);
                    resolve(false); // Nenhum registro foi encontrado para atualizar
                }
            }
        });
    });
}
function recuperar(nomeResponsavel, numeroRegistro, frequenciaIdealProcessador, capacidadeDisco, maxUsoDisco, capacidadeRam, maxUsoRam, velocidaDeRede, id) {
    console.log("function recuperar():", nomeResponsavel, numeroRegistro, frequenciaIdealProcessador, capacidadeDisco, maxUsoDisco, capacidadeRam, maxUsoRam, velocidaDeRede, id);

    var instrucaoUsuario = `
      SELECT * FROM servidor
      WHERE idServidor = ?;
    `;

    const valor = [id];

    console.log("Executando a instrução SQL: \n" + instrucaoUsuario);

    return new Promise((resolve, reject) => {
        connection.query(instrucaoUsuario, valor, (error, results) => {
            if (error) {
                console.log(error);
                console.log("\nHouve um erro ao recuperar os dados! Erro: ", error.sqlMessage);
                reject(error);
            } else {
                // Verifica se pelo menos uma linha foi retornada
                if (results.length > 0) {
                    const data = results[0]; // Assume que apenas um registro é retornado
                    console.log("Dados recuperados:", data);
                    resolve(data);
                } else {
                    console.log(`Registro com ID ${id} não encontrado.`);
                    resolve(null);
                }
            }
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
    recuperar,
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
