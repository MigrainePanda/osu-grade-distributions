import pg from "pg";
import { configDotenv } from "dotenv";
import * as timeHelper from "./utils/conversions.js";
configDotenv();

const { Pool } = pg;
const connectionString = process.env.DATABASE_URL;

let db;

if (
    process.env.NODE_ENV === "staging" ||
    process.env.NODE_ENV === "production"
) {
    console.log("\nStaging/Production Env Database");
    db = new Pool({
        connectionString,
        ssl: {
            rejectUnauthorized: false,
        },
    });
} else {
    console.log("\nDevelopment Env Database");
    db = new Pool({
        user: "postgres",
        password: process.env.POSTGRES_LOCAL_PASSWORD,
        host: "localhost",
        port: 5432,
        database: "testing_osu_grade_distributions",
    });
}

try {
    const checkConn = await db.query("SELECT NOW()");
    // const currTime = checkConn.rows[0].now;
    const currTime = timeHelper.getCurrentEpoch();
    console.log(`Succesfully connected to the database at ${currTime}.`);
} catch (err) {
    console.error(err);
}

export default db;
