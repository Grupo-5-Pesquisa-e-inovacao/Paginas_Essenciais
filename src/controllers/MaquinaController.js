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


async function cadastrar(req, res) {
    try {
        var nomeResponsavel = req.body.nomeResponsavel;
        var numeroRegistro = req.body.numeroRegistro;
        var frequenciaIdealProcessador = req.body.frequenciaIdealProcessador;
        var capacidadeDisco = req.body.capacidadeDisco;
        var maxUsoDisco = req.body.maxUsoDisco;
        var capacidadeRam = req.body.capacidadeRam;
        var maxUsoRam = req.body.maxUsoRam;
        var velocidadeDeRede = req.body.velocidadeDeRede;

        // Chame o serviço para cadastrar a máquina
        const result = await MaquinaService.cadastrar(
            nomeResponsavel,
            numeroRegistro,
            frequenciaIdealProcessador,
            capacidadeDisco,
            maxUsoDisco,
            capacidadeRam,
            maxUsoRam,
            velocidadeDeRede
        );

        console.log("Máquina cadastrada com sucesso.");
        res.status(201).json({ message: "Máquina cadastrada com sucesso.", result });
    } catch (error) {
        console.error("Erro ao cadastrar a máquina:", error);

        // Verifique se o erro é uma instância de Error para obter detalhes
        if (error instanceof Error) {
            res.status(500).json({ error: `Erro ao cadastrar a máquina. Detalhes: ${error.message}` });
        } else {
            res.status(500).json({ error: "Erro ao cadastrar a máquina. Detalhes indisponíveis." });
        }
    }
}


function update(req, res) {
    var nomeResponsavel = req.body.nomeResponsavel;
    var numeroRegistro = req.body.numeroRegistro;
    var frequenciaIdealProcessador = parseFloat(req.body.frequenciaIdealProcessador);
    var capacidadeDisco = req.body.capacidadeDisco;
    var maxUsoDisco = req.body.maxUsoDisco;
    var capacidadeRam = req.body.capacidadeRam;
    var maxUsoRam = req.body.maxUsoRam;
    var velocidadeDeRede = parseFloat(req.body.velocidadeDeRede);

    var id = req.params.id;

    MaquinaService.update(nomeResponsavel, numeroRegistro, frequenciaIdealProcessador, capacidadeDisco, maxUsoDisco, capacidadeRam, maxUsoRam, velocidadeDeRede, id)
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

function recuperarValoresDoBancoDeDados(req, res) {
    var id = req.params.id;

    if (!id) {
        res.status(400).send("ID não fornecido.");
        return;
    }

    console.log("function recuperar():", id);

    MaquinaService.recuperarValoresDoBancoDeDados(id) 
        .then(function (resultado) {
            if (resultado && resultado.length > 0) {
                var valoresDoBancoDeDados = resultado[0]; 

                res.status(200).json(valoresDoBancoDeDados);
            } else {
                res.status(404).send("Registro não encontrado.");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao recuperar os valores do banco de dados! Erro: ", erro.message);
            res.status(500).json({ error: erro.message });
        });
}


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
    recuperarValoresDoBancoDeDados,
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
                    velocidadeDeRede: maquina.velocidadeDeRede,
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
                    velocidadeDeRede: maquina.velocidadeDeRede,
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