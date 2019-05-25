var desenvolvimento = false;

var configuracoes = {
    producao: {
        server: "01191022.database.windows.net",
        user: "vtrx",
        password: "Lelinho2010",
        database: "vtrmassao",
        options: {
            encrypt: true
        },
        pool: {
            max: 4,
            min: 1,
            idleTimeoutMillis: 30000
        }
    },
    desenvolvimento: {
        server: "01191022.database.windows.net",
        user: "vtrx",
        password: "Lelinho2010",
        database: "vtrmassao",
        options: {
            encrypt: true
        }
    }
}
 
var sql = require('mssql');
sql.on('error', err => {
    console.error(`Erro de Conexão: ${err}`);
});

var perfil = desenvolvimento ? 'desenvolvimento' : 'producao';

function conectar() {
  return sql.connect(configuracoes[perfil])
  // return new sql.ConnectionPool();  
} 

module.exports = {
    conectar: conectar,
    sql: sql
}