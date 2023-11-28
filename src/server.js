require('dotenv').config({path:'variaveis.env'})

const express = require('express');
const port = process.env.PORT || 3300;
const server = express();
const MaquinaController = require('./controllers/MaquinaController.js');
const ProvedoraController = require('./controllers/ProvedoraController.js');
const UnidadeController = require('./controllers/UnidadeController.js');
const cors = require('cors');
server.use(cors());
const bodyParser = require('body-parser');

//server.use(express.urlencoded({ extended: true }));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.static(__dirname + '/public'))
server.use(express.json());



// telas 
server.get('/', function(req,res){
    res.sendFile(__dirname + '/paginasHTML/index.html')
})

server.get('/loginCadastro', function(req,res){
    res.sendFile(__dirname + '/paginasHTML/loginCadastro.html')
})

server.get('/addUnidadePadrao', function(req,res){
    res.sendFile(__dirname + '/paginasHTML/addUnidadePadrao.html')
})

server.get('/dashboard', function(req,res){
    res.sendFile(__dirname + '/paginasHTML/dashboard.html')
})

server.get('/visaoGeral', function(req,res){
    res.sendFile(__dirname + '/paginasHTML/visaoGeral.html')
})

server.get('/cadastroMaquina', function(req,res){
    res.sendFile(__dirname + '/paginasHTML/CadastroMaquinas.html')
})

server.get('/telaMaquina', function(req,res){
    res.sendFile(__dirname + '/paginasHTML/telaMaquina.html')
})

server.get('/telaUnidade', function(req,res){
    res.sendFile(__dirname + '/paginasHTML/telaUnidade.html')
})

server.get('/cadastroUnidadesFirtLogin', function(req,res){
    res.sendFile(__dirname + '/paginasHTML/cadastroUnidadesFirstLogin.html') 
})

//login e cadastro da provedora
server.post("/logar", function (req, res) {
    ProvedoraController.entrar(req, res);
  });

  server.post("/cadastrar", function (req, res) {
    ProvedoraController.cadastrar(req, res);
  });  

   server.get("/teste", function (req,res){
     res.sendFile(__dirname + '/testeexecucao.html')
   });

// cadastro de maquina na unidade
  server.post("/cadastrar/:id", function(req, res){
  MaquinaController.cadastrar(req,res);
  })
  server.delete("/excluir/:id", function(req,res){
    MaquinaController.excluir(req,res);
  })
  server.post("/update/:id", function(req,res){
    MaquinaController.update(req, res);
  })
  server.post("/recuperar/:id", function(req,res){
    MaquinaController.recuperar(req, res);
  })
// Fim do cadastro maquina na unidade
  server.delete('/deletar/:id', function (req,res){
    ProvedoraController.excluir(req,res)
  });

  server.put('/atualizar/:id', function(req,res) {
    ProvedoraController.atualizar(req,res)
  });

  server.get('/visualizar/:id',function(req,res){
    ProvedoraController.visualizarPorId(req,res)
  });


const arquivoExe = '/home/ubuntu/testeServer/CamelLooca.exe';

server.get('/downloads/CamelLooca.exe', (req, res) => {
    res.download(arquivoExe);
});


// funções de plot no grafico
server.get('/dadosMaquina/:codigo',MaquinaController.buscarTudo);

server.get('/allDadosMaquinas',MaquinaController.buscarAllDados);

server.get('/dadosRamMaquina/:codigo',MaquinaController.buscarRam);

server.get('/dadosCPUMaquina/:codigo',MaquinaController.buscarCPU);

//console: mensagem servidor


// // crud unidade

server.post("/logarUnidade", function (req, res) {
    UnidadeController.entrar(req, res);
  });

  server.post("/cadastrarUnidade", function (req, res) {
    UnidadeController.cadastrar(req, res);
  });  

  server.get("/", function (req,res){
    res.sendFile(__dirname + '/testeexecucao.html')
  })

  server.delete('/deletarUnidade/:idunidadeProvedora', function (req,res){
    UnidadeController.excluir(req,res)
  })

  server.put('/atualizarUnidade/:idunidadeProvedora', function(req,res) {
    UnidadeController.atualizar(req,res)
  })

  server.get('/visualizarUnidade/:idunidadeProvedora',function(req,res){
    UnidadeController.visualizarPorId(req,res)
  })


  server.listen(port, ()=>{
    console.log(`Servidor rodando em: http://localhost:${port}`);
});