const usuarioServices = require('../services/ProvedoraService');


const idProvedora = usuarioServices.idProvedora

function entrar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
      res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
      res.status(400).send("Sua senha está indefinida!");
  } else {
      usuarioServices
          .entrar(email, senha)
          .then(function (resultado) {
              console.log(`\nResultados encontrados: ${resultado.length}`);
              console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

              if (resultado.length == 1) {
                  console.log(resultado);
                  res.json(resultado[0]);
              } else if (resultado.length == 0) {
                  res.status(403).send("Email e/ou senha inválido(s)");
              } else {
                  res.status(403).send("Mais de um usuário com o mesmo login e senha!");
              }
          })
          .catch(function (erro) {
              console.log(erro);
              console.log(
                  "\nHouve um erro ao realizar o login! Erro: ",
                  erro.sqlMessage
              );
              res.status(500).json(erro.sqlMessage);
          });
  }

}

  function cadastrarUser(req, res) {

    var email = req.body.email;
    var senha = req.body.senha;
    var cpf = req.body.cpf;
    var nome = req.body.nome;

  
    if (!email || !senha) {
      res.status(400).json({ error: "Email e senha são obrigatórios." });
      return;
    }
    usuarioServices.cadastrarUser(email,senha,cpf,nome)
      .then(function (resultado) {
        console.log("Usuário cadastrado com sucesso.");
        res.status(201).json({ message: "Usuário cadastrado com sucesso." });
      })
      .catch(function (erro) {
        console.error("Erro ao cadastrar o usuário:", erro);
        res.status(500).json({ error: "Erro ao cadastrar o usuário." });
      });
  }
  function cadastrarProvedora(req, res) {
    var razaoSocial = req.body.razaoSocial;
    var cnpj = req.body.cnpj
    usuarioServices.cadastrarProvedora(razaoSocial, cnpj)
      .then(function (resultado) {
        res.status(201).json({ message: "Provedora cadastrada com sucesso.", idProvedora});
        
      })
      .catch(function (erro) {
        console.error("Erro ao cadastrar provedora:", erro);
        res.status(500).json({ error: "Erro ao cadastrar provedora.", idProvedora });
      });
  }



  function excluir(req, res) {
    var id = req.params.id; // Assumindo que o ID a ser excluído está presente nos parâmetros da requisição
  
    if (id == undefined) {
      res.status(400).send("O ID está indefinido!");
    } else {
      usuarioServices.excluir(id) // Chame a função de serviço "excluir" que criamos anteriormente
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
  
  function atualizar(req, res) {
    var id = req.params.id; 
    var email = req.body.email;
    var senha = req.body.senha;
    var nomeFantasia = req.body.nomeFantasia;
    var razaoSocial = req.body.razaoSocial;
  
    if (id == undefined) {
      res.status(400).send("O ID está indefinido!");
    } else {
      usuarioServices.atualizar(id, email, senha, nomeFantasia, razaoSocial) 
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


function visualizarPorId(req, res) {
  var id = req.params.id; 

  if (id == undefined) {
    res.status(400).send("O ID está indefinido!");
  } else {
    usuarioServices.visualizarPorId(id)
  .then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(200).json({ message: "Nenhum registro encontrado para o ID fornecido." });
    }
  })
  .catch(function (erro) {
    console.log(erro);
    console.log("\nHouve um erro ao buscar os dados! Erro: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });

  }
}

function visualizarUltimo(req, res) {
  usuarioServices.visualizarUltimo()
    .then(function (ultimoIdProvedora) {
      if (ultimoIdProvedora !== null) {
        res.status(200).json({ ultimoIdProvedora });
      } else {
        res.status(200).json({ message: "Nenhum registro encontrado na tabela provedora." });
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("\nHouve um erro ao buscar o último ID da provedora! Erro: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}





  
  module.exports = {
    entrar,
    cadastrarUser,
    cadastrarProvedora,
    excluir,
    atualizar,
    visualizarPorId,
    visualizarUltimo
  }
