const sql = require('mssql')
require("dotenv").config({ path: __dirname + '/.env' });


//configuration for the server
const config = {
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
        encrypt:false, //mssql doesn't need true only azure does
        enableArithAbort: true
    },
    port: parseInt(process.env.DB_PORT)
};

//creates a connection pool and exports it as a promise 
const poolPromise = new sql.ConnectionPool(config)
.connect()
.then(pool => {
    console.log('Connected to database');
    return pool;

})
.catch(err => {
    console.error('Database connection failed: ', err)
    throw err;
});

module.exports = {
    sql,
    poolPromise
};