import db from "../../db.js";
import * as timeHelper from "../conversions.js";

const getAllYears = async () => {
    const query = `SELECT calendar_year FROM years ORDER BY calendar_year asc`;
    return new Promise((resolve, reject) => {
        db.query(query, (err, res) => {
            if (err) {
                reject(err);
                return;
            }
            if (!res) {
                reject(err);
                return;
            }
            if (res.rows.length != 0) {
                console.log(
                    `All rows successfully retrieved at ${timeHelper.getCurrentEpoch()}:`
                );
            }
            resolve(res.rows);
        });
    });
};

const getYearByNumber = async (num) => {
    const query = `SELECT * FROM years where calendar_year=$1`;
    const values = [num];
    return new Promise((resolve, reject) => {
        db.query(query, values, (err, res) => {
            if (err) reject(err);
            if (res.rows.length != 0) {
                console.log(
                    `Row successfully retrieved at ${timeHelper.getCurrentEpoch()}:`
                );
            }
            resolve(res.rows);
        });
    });
};

const addYear = async (num) => {
    const query = `
        INSERT INTO
            years (calendar_year)
        VALUES
            ($1)
        ON CONFLICT (calendar_year) DO NOTHING
    `;
    const values = [num];
    return new Promise((resolve, reject) => {
        db.query(query, values, (err, res) => {
            if (err) reject(err);
            resolve("Year successfully added");
        });
    });
};

const deleteYearByNumber = async (num) => {
    const query = `DELETE FROM years where calendar_year=$1`;
    const values = [num];
    return new Promise((resolve, reject) => {
        db.query(query, values, (err, res) => {
            if (err) reject(err);
            resolve(
                `Year successfully deleted at ${timeHelper.getCurrentEpoch()}.`
            );
        });
    });
};

export { getAllYears, getYearByNumber, addYear, deleteYearByNumber };
