const mysql =require('promise-mysql')
const config =require('./config')
var pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    connectionLimit: config.connectionLimit
});
module.exports = pool;

