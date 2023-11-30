const DashboardService = require('../services/DashboardService')


async function obterDadosCapturados(req, res) {
  const servidorId = req.params.servidorId;

  try {
    const dadosCapturados = await DashboardService.obterDadosCapturados(servidorId);
    res.status(200).json(dadosCapturados);
  } catch (error) {
    console.error('Erro ao obter dados capturados:', error);
    res.status(500).json({ error: 'Erro ao obter dados capturados.' });
  }
}
  
  
  module.exports = {
    obterDadosCapturados,
  };