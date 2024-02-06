import mysql from "mysql2";
import * as process from "process";
import * as module from "module";

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.MYSQL_DB,
});
export default connection;
