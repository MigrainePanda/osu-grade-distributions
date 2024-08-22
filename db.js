import mysql from 'mysql2';
import { configDotenv } from 'dotenv';
import { readFileSync } from 'fs';
configDotenv();

const db = mysql.createPool({
  connectionLimit : 10,
  host            : process.env.DB_HOST,
  user            : process.env.DB_USER,
  password        : process.env.DB_PASSWORD,
  database        : process.env.DB_NAME,
  port            : Number(process.env.DB_PORT),
  ssl: {
    rejectUnauthorized: true,
    ca: readFileSync('certs/stg-ca.pem'),
    cert: readFileSync('certs/stg-cert.pem'),
    key: readFileSync('certs/stg-key.pem'),
  }
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