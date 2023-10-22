// Controle da api
const MaquinaService = require('../services/MaquinaService');


module.exports = {
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
                    rede: maquina.rede, 
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

    buscarCPU: async (req, res) =>{
        try{
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