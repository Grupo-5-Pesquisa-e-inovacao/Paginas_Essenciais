const db = require('../db');
const sql = require('mssql')


async function obterDadosCapturados(servidorId) {
  const instrucao = `
  SELECT 
  servidor.idServidor AS IDServidor,
  tipoDado.tipoDado AS TipoDadoCapturado,
  dadosCapturados.dadoCapturado AS ValorCapturado,
  dadosCapturados.dtHora AS DataHoraCaptura
FROM dadosCapturados
INNER JOIN configuracao ON dadosCapturados.fkConfiguracao = configuracao.idConfiguracao
INNER JOIN tipoDado ON dadosCapturados.fkTipoDado = tipoDado.idtipoDado
INNER JOIN tipoComponente ON configuracao.fktipoComponente = tipoComponente.idtipoComponente
INNER JOIN servidor ON configuracao.fkServidor = servidor.idServidor
WHERE servidor.idServidor = 3
ORDER BY DataHoraCaptura DESC;


  `;

  try {
    const request = db.request();
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