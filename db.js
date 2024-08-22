import mysql from 'mysql2';
import { configDotenv } from 'dotenv';
configDotenv();

const db = mysql.createPool({
  connectionLimit : 10,
  host            : process.env.DB_HOST,
  user            : process.env.DB_USER,
  password        : process.env.DB_PASSWORD,
  database        : process.env.DB_NAME
});

db.getConnection((err, con) => {
    if (err) {
        console.log(`Could not connect to the database ${err}.`)
    }else{
        console.log("Succesfully connected to the database.")
    }
    console.log();
});

export default db;