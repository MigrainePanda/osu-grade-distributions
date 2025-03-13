import db from "../../db.js";
import * as timeHelper from "../conversions.js";

const getAllTerms = async () => {
    const query = `SELECT term_number, term_name from terms`;
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

const getTermByNumber = async (num) => {
    const query = `SELECT * FROM terms where term_number=$1`;
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

const addTerm = async (num, name) => {
    const query = `
        INSERT INTO
            terms (term_number, term_name)
        VALUES
            ($1, $2)
        ON CONFLICT (term_number) DO NOTHING
    `;
    const values = [num, name];
    return new Promise((resolve, reject) => {
        db.query(query, values, (err, res) => {
            if (err) reject(err);
            resolve("Term successfully added");
        });
    });
};

const deleteTermByNumber = async (num) => {
    const query = `DELETE FROM terms where term_number=$1`;
    const values = [num];
    return new Promise((resolve, reject) => {
        db.query(query, values, (err, res) => {
            if (err) reject(err);
            resolve(
                `Term successfully deleted at ${timeHelper.getCurrentEpoch()}.`
            );
        });
    });
};

export { getAllTerms, getTermByNumber, addTerm, deleteTermByNumber };
