import pg from 'pg';
import { configDotenv } from 'dotenv';
import { readFileSync } from 'fs';
configDotenv();



const { Pool } = pg;

const db = new Pool({
    user: "postgres",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "osu_grade_distributions"
});

try {
    const checkConn = await db.query('SELECT NOW()');
    const currTime = checkConn.rows[0].now;
    console.log(`Succesfully connected to the database at ${currTime}.`);
}
catch {
    console.error("Could not connect to the database.");
}

export default db;