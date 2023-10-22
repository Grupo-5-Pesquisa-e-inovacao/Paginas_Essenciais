require('dotenv').config({path:'variaveis.env'})

const express = require('express');
const MaquinaController = require('./controllers/MaquinaController.js');   
const server = express();
const port = process.env.PORT || 3000;

server.use(express.static(__dirname + '/public'))

// C:\Users\luanr\OneDrive\Documentos\GitHub\Paginas_Essenciais\src\public


server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get('/', function(req,res){
    res.sendFile(__dirname + '/paginasHTML/index.html')
})

server.get('/loginCadastro', function(req,res){
    res.sendFile(__dirname + '/paginasHTML/loginCadastro.html')
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





server.get('/dadosMaquina/:codigo',MaquinaController.buscarTudo);

server.get('/dadosRamMaquina/:codigo',MaquinaController.buscarRam);

server.get('/dadosCPUMaquina/:codigo',MaquinaController.buscarCPU);

server.listen(port, ()=>{
    console.log(`Servidor rodando em: http://localhost:${port}`);
});