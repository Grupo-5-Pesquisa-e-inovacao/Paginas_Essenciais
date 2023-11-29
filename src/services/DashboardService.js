const db = require('../db');

async function obterDadosCapturados(servidorId) {
  const instrucao = `
    SELECT 
      servidor.idServidor AS IDServidor,
      tipoDado.tipoDado AS TipoDadoCapturado,
      dadosCapturados.dadoCapturado AS ValorCapturado
    FROM dadosCapturados
    INNER JOIN configuracao ON dadosCapturados.fkConfiguracao = configuracao.idConfiguracao
    INNER JOIN tipoDado ON dadosCapturados.fkTipoDado = tipoDado.idtipoDado
    INNER JOIN tipoComponente ON configuracao.fktipoComponente = tipoComponente.idtipoComponente
    INNER JOIN servidor ON configuracao.fkServidor = servidor.idServidor
    WHERE servidor.idServidor = @servidorId;
  `;

  try {
    const request = connection.request();
    request.input('servidorId', sql.Int, servidorId);

    const resultado = await request.query(instrucao);
    return resultado.recordset;
  } catch (error) {
    console.error('Erro ao executar a consulta:', error);
    throw error;
  }
}
  
  module.exports = {
    obterDadosCapturados,
  };