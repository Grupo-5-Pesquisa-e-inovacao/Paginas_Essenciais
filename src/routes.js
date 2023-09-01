const express = require('express')
const server = express()
const porta = 3300

server.use(express.static(__dirname + '/public'))

server.get('/teste', (req, res) =>{
    res.send("Servidor rodando")
});

server.get('/home', (req, res) =>{
    res.sendFile(__dirname + 'caminho relativo do arquivo home')
});

server.get('/login-cadastro', (req, res) =>{
    res.sendFile(__dirname + 'caminho relativo do arquivo login e cadastro')
});

server.listen(porta,() => {
    console.log(`Servidor rodando na porta http://localhost:${porta}!!!`)
})