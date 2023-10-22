// configuração da conexão com o banco de dados

const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: 'localhost' ,
    user: 'aidmin',
    password: 'CamelLooca1',
    database: 'camelTech'
});

connection.connect((error) => {
    if (error) {
        console.error('Erro ao conectar ao banco de dados:', error.message);
    } else {
        console.log(`Conectado ao Banco de Dados: ${process.env.DB_NAME}`);
    }
});

module.exports = connection;
