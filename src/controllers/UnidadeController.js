const UnidadeService = require('../services/UnidadeService');

  
  function cadastrar(req, res) {
    var nomeUnidade = req.body.nomeUnidade;
    var senha = req.body.senha;
    var email = req.body.email
    var cep = req.body.cep;
    var rua = req.body.rua;
    var complemento = req.body.complemento;
    var numero = req.body.numero;
    var representante = req.body.representante;
    var fkProvedora = req.body.fkProvedora;
  

    UnidadeService.cadastrar(rua, numero, complemento, cep, nomeUnidade, representante, email, senha, fkProvedora)
      .then(function (resultado) {
        console.log("Usuário cadastrado com sucesso.");
        res.status(201).json({ message: "Usuário cadastrado com sucesso.", resultado });
      })
      .catch(function (erro) {
        console.error("Erro ao cadastrar o usuário:", erro);
        res.status(500).json({ error: "Erro ao cadastrar o usuário." });
      });
  }
  function excluir(req, res) {
    var idunidadeProvedora = req.params.idunidadeProvedora; // Assumindo que o ID a ser excluído está presente nos parâmetros da requisição
  
    if (idunidadeProvedora == undefined) {
      res.status(400).send("O ID está indefinido!");
    } else {
      UnidadeService.excluir(idunidadeProvedora) // Chame a função de serviço "excluir" que criamos anteriormente
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

  function listarUnidades(req, res) {
    const idProvedora = req.params.id;
    UnidadeService.listarUnidades(idProvedora)
      .then(function (resultado) {
        console.log(resultado);
  
        res.status(200).json(resultado);
      })
      .catch(function (erro) {
        console.error("Erro ao listar unidades:", erro);
        res.status(500).json({ erro: "Erro interno ao processar a requisição." });
      });
  }
  


  function atualizar(req, res) {
    var idunidadeProvedora = req.params.idunidadeProvedora; 
    var nomeUnidade = req.body.nomeUnidade;
    var senha = req.body.senha;
    var cep = req.body.cep;
    var rua = req.body.rua;
    var complemento = req.body.complemento;
    var numero = req.body.numero;
    var fkProvedora = req.body.fkProvedora

  
    if (idunidadeProvedora == undefined) {
      res.status(400).send("O ID está indefinido!");
    } else {
      UnidadeService.atualizar(idunidadeProvedora,nomeUnidade,cep,rua,complemento,numero,senha,fkProvedora) 
        .then(function (resultado) {
          if (resultado.affectedRows > 0) {
            res.status(200).send("Registro atualizado com sucesso!");
          } else {
            res.status(404).send("Registro não encontrado.");
          }
        })
        .catch(function (erro) {
          console.log(erro);
          console.log("\nHouve um erro ao atualizar o registro! Erro: ", erro.sqlMessage);
          res.status(500).json(erro.sqlMessage);
        });
    }
  }


function visualizarUnidade(req, res) {
  const idUnidade = req.params.idUnidadeClick;
  UnidadeService.visualizarUnidade(idUnidade)
    .then(function (resultado) {
      console.log(resultado);

      res.status(200).json(resultado);
    })
    .catch(function (erro) {
      console.error("Erro ao buscar unidade:", erro);
      res.status(500).json({ erro: "Erro interno ao processar a requisição." });
    });
}

function visualizarUltimo(req, res) {
  UnidadeService.visualizarUltimo()
    .then(function (resultado) {
      if (resultado.length > 0) {
        console.log("ultimo idUnidadeProvedora"+resultado)
        res.status(200).json(resultado);
      } else {
        res.status(200).json({ message: "Nenhum registro encontrado na tabela unidadeProvedora." });
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("\nHouve um erro ao buscar os dados! Erro: ", erro.sqlMessage);
      res.status(500).json({ error: "Erro ao buscar os dados da tabela unidadeProvedora." });
    });
}



  
  module.exports = {
    cadastrar,
    excluir,
    atualizar,
    visualizarUnidade,
    visualizarUltimo,
    listarUnidades
  }
