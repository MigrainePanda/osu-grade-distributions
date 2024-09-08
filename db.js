import pg from 'pg';
import { configDotenv } from 'dotenv';
import { readFileSync } from 'fs';
configDotenv();

const { Pool } = pg;
const connectionString = process.env.DATABASE_URL;

let db;

if (process.env.NODE_ENV === "staging" || process.env.NODE_ENV === "production") {
    console.log("\n\nStaging/Production Env Database\n\n");
    db = new Pool({
        connectionString
    });   
}
else {
    console.log("\nDevelopment Env Database");
    db = new Pool({
        user: "postgres",
        password: "password",
        host: "localhost",
        port: 5432,
        database: "osu_grade_distributions"
    });
}

try {
    const checkConn = await db.query('SELECT NOW()');
    const currTime = checkConn.rows[0].now;
    console.log(`Succesfully connected to the database at ${currTime}.`);
}
catch {
    console.error("Could not connect to the database.");
}

export default db;