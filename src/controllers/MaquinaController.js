// Controle da api
const MaquinaService = require('../services/MaquinaService');
const ProvedoraService = require('../services/ProvedoraService');

function visualizarPorId(id) {
    var instrucao = `
      SELECT * FROM unidadeProvedora WHERE idProvedora = ?;
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


function cadastrar(req, res) {
    var nomeResponsavel = req.body.nomeResponsavel;
    var numeroRegistro = req.body.numeroRegistro;
    var frequenciaIdealProcessador = req.body.frequenciaIdealProcessador;
    var capacidadeDisco = req.body.capacidadeDisco;
    var maxUsoDisco = req.body.maxUsoDisco;
    var capacidadeRam = req.body.capacidadeRam
    var maxUsoRam = req.body.maxUsoRam;
    var velocidaDeRede = req.body.velocidaDeRede;



    // Chame o serviço para cadastrar a máquina
    MaquinaService.cadastrar(nomeResponsavel, numeroRegistro, frequenciaIdealProcessador, capacidadeDisco, maxUsoDisco, capacidadeRam, maxUsoRam, velocidaDeRede)

        .then(function (resultado) {
            console.log("Máquina cadastrada com sucesso.");
            res.status(201).json({ message: "Máquina cadastrada com sucesso." });
        })
        .catch(function (erro) {
            console.error("Erro ao cadastrar a máquina:", erro);

            // Verifique se o erro é uma instância de Error para obter detalhes
            if (erro instanceof Error) {
                res.status(500).json({ error: `Erro ao cadastrar a máquina. Detalhes: ${erro.message}` });
            } else {
                res.status(500).json({ error: "Erro ao cadastrar a máquina. Detalhes indisponíveis." });
            }
        });
}

function update(req, res) {
    var nomeResponsavel = req.body.nomeResponsavel;
    var numeroRegistro = req.body.numeroRegistro;
    var frequenciaIdealProcessador = parseFloat(req.body.frequenciaIdealProcessador);
    var capacidadeDisco = req.body.capacidadeDisco;
    var maxUsoDisco = req.body.maxUsoDisco;
    var capacidadeRam = req.body.capacidadeRam;
    var maxUsoRam = req.body.maxUsoRam;
    var velocidaDeRede = parseFloat(req.body.velocidaDeRede);

    var id = req.params.id;

    MaquinaService.update(nomeResponsavel, numeroRegistro, frequenciaIdealProcessador, capacidadeDisco, maxUsoDisco, capacidadeRam, maxUsoRam, velocidaDeRede, id)
        .then(function (resultado) {
            // Verifica se houve alguma linha afetada (indicando que o registro foi atualizado)
            if (resultado) {
                res.status(200).send("Registro atualizado com sucesso!");
            } else {
                res.status(404).send("Registro não encontrado.");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao atualizar o registro! Erro: ", erro.sqlMessage);
            res.status(500).json({ error: erro.sqlMessage });
        });
}
var id = req.params.id;

MaquinaService.recuperar(nomeResponsavel, numeroRegistro, frequenciaIdealProcessador, capacidadeDisco, maxUsoDisco, capacidadeRam, maxUsoRam, velocidaDeRede, id)
    .then(function (resultado) {
        // Verifica se houve alguma linha afetada (indicando que o registro foi atualizado)
        if (resultado) {
            res.status(200).send("Registro atualizado com sucesso!");
        } else {
            res.status(404).send("Registro não encontrado.");
        }
    })
    .catch(function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao atualizar o registro! Erro: ", erro.sqlMessage);
        res.status(500).json({ error: erro.sqlMessage });
    });
function excluir(req, res) {
    var id = req.params.id; // Assumindo que o ID a ser excluído está presente nos parâmetros da requisição

    if (id == undefined) {
        res.status(400).send("O ID está indefinido!");
    } else {
        MaquinaService.excluir(id) // Chame a função de serviço "excluir" que criamos anteriormente
            .then(function (resultado) {
                if (resultado.affectedRows > 0) {
                    res.status(200).send("Registro excluído com sucesso!");
                } else {
                    res.status(404).send("Registro não encontrado.");
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao excluir o registro! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}


module.exports = {
    cadastrar,
    update,
    recuperar,
    excluir,
    buscarTudo: async (req, res) => {
        try {
            const codigo = req.params.codigo;
            const maquinas = await MaquinaService.buscarTudo(codigo);

            const json = {
                error: null,
                result: maquinas.map(maquina => ({
                    codigo: maquina.codigo,
                    totalRam: maquina.totalRam,
                    emUsoRam: maquina.emUsoRam,
                    nomeProcessador: maquina.nomeProcessador,
                    usoDisco: maquina.usoDisco,
                    tamanhoDisco: maquina.tamanhoDisco,
                    nomeDisco: maquina.nomeDisco,
                    velocidaDeRede: maquina.velocidaDeRede,
                    qtdEmUso: maquina.qtdEmUso,
                    frequencia: maquina.frequencia,
                    hostName: maquina.hostName,
                    numIpv4: maquina.numIpv4,
                    bytesRecebidos: maquina.bytesRecebidos,
                    bytesEnviados: maquina.bytesEnviados,
                }))
            };

            res.json(json);
        } catch (error) {
            // Trata os erros apropriadamente;
            res.status(500).json({ error: 'Ocorreu um erro ao buscar as máquinas.' });
        }
    },

    buscarAllDados: async (req, res) => {
        try {
            const maquinas = await MaquinaService.buscarAllDados();

            const json = {
                error: null,
                result: maquinas.map(maquina => ({
                    codigo: maquina.codigo,
                    totalRam: maquina.totalRam,
                    emUsoRam: maquina.emUsoRam,
                    nomeProcessador: maquina.nomeProcessador,
                    usoDisco: maquina.usoDisco,
                    tamanhoDisco: maquina.tamanhoDisco,
                    nomeDisco: maquina.nomeDisco,
                    velocidaDeRede: maquina.velocidaDeRede,
                    qtdEmUso: maquina.qtdEmUso,
                    frequencia: maquina.frequencia,
                    hostName: maquina.hostName,
                    numIpv4: maquina.numIpv4,
                    bytesRecebidos: maquina.bytesRecebidos,
                    bytesEnviados: maquina.bytesEnviados,
                }))
            };

            res.json(json);
        } catch (error) {
            // Trata os erros apropriadamente;
            res.status(500).json({ error: 'Ocorreu um erro ao buscar as máquinas.' });
        }
    },

    buscarRam: async (req, res) => {
        try {
            const codigo = req.params.codigo;
            const maquina = await MaquinaService.buscarRam(codigo);

            if (maquina) {
                const json = {
                    error: null,
                    result: {
                        codigo: maquina.codigo,
                        totalRam: maquina.totalRam,
                        emUsoRam: maquina.emUsoRam,
                    }
                };

                res.json(json);
            } else {
                res.status(404).json({ error: 'Máquina não encontrada' });
            }

        } catch (error) {
            res.status(500).json({ error: 'Ocorreu um erro ao buscar a máquina' });
        }
    },

    buscarCPU: async (req, res) => {
        try {
            const codigo = req.params.codigo;
            const maquina = await MaquinaService.buscarCPU(codigo);

            if (maquina) {
                const json = {
                    error: null,
                    result: {
                        codigo: maquina.codigo,
                        qtdEmUso: maquina.qtdEmUso,
                        frequencia: maquina.frequencia,
                    }
                };

                res.json(json);
            } else {
                res.status(404).json({ error: 'Máquina não encontrada' });
            }

        } catch (error) {
            res.status(500).json({ error: 'Ocorreu um erro ao buscar a máquina' });
        }

    }
};