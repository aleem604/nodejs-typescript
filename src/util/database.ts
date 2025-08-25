import mysql from "mysql2";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "mysql-node",
  password: "root",
});


export default pool.promise();