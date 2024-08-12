import mysql from 'mysql2';
import { configDotenv } from 'dotenv';

configDotenv();

const db_name = "osu_grade_distributions";
const db = mysql.createPool({
  connectionLimit : 10,
  host            : "localhost",
  user            : "root",
  password        : process.env.DB_PASSWORD,
  database        : db_name
});

db.getConnection((err, con) => {
    if (err) {
        console.log(`Could not connect to the database ${err}.`)
    }else{
        console.log("Succesfully connected to the database.")
    }
    console.log();
});

async function makeRequest(url, payload) {
  try {
    const response = await fetch(url, payload); 

    if (!response.ok) {
      console.log("response: ", response)
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data;
  }
  catch (err) {
    console.error('Fetch error: ', err)
  }
}

export { db, makeRequest };