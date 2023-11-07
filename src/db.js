// configuração da conexão com o banco de dados

const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: 'localhost' ,
    user: 'aidmin',
    password: 'aidmin',
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

// const mysql = require('mysql2');

// const connection = mysql.createConnection('mysql://root:Utjrg0FbyRsc68BFOQC3@containers-us-west-156.railway.app:6470/railway');

// connection.connect((error) => {
//     if (error) {
//         console.error('Erro ao conectar ao banco de dados:', error.message);
//     } else {
//         console.log(`Conectado ao Banco de Dados: ${process.env.DB_NAME}`);
//     }
// });

// module.exports = connection;
