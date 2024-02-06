import mysql from 'mysql2';
import * as process from 'process';

const connection = mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "1234",
    database: "testinterview",
});

export default connection;
