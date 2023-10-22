const db = require('../db');

module.exports = {
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
            db.query('SELECT dh.totalRam, dh.emUsoRam FROM dadosHardware dh INNER JOIN captura c ON dh.idDadosHardware = c.fkDados INNER JOIN servidor s ON c.fkServidor = s.idServidor WHERE s.idServidor = ?', [codigo], (error, results) => {
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
