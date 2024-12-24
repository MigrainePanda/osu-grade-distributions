import db from "../../db.js";
import * as timeHelper from "../conversions.js";

const getAllCredits = async () => {
    const query = `SELECT credit_id, credit_value from credits order by length(credit_value), credit_value asc`;
    return new Promise((resolve, reject) => {
        db.query(query, (err, res) => {
            if (err) reject(err);
            if (res.rows.length != 0) {
                console.log(
                    `All rows successfully retrieved at ${timeHelper.getCurrentEpoch()}:`
                );
            }
            resolve(res.rows);
        });
    });
};

const getCreditByID = async (id) => {
    const query = `SELECT * FROM credits where credit_id=$1`;
    const values = [id];
    return new Promise((resolve, reject) => {
        db.query(query, values, (err, res) => {
            if (err) reject(err);
            if (res.rows.length != 0) {
                console.log(
                    `Row successfully retrieved at ${timeHelper.getCurrentEpoch()}:`
                );
            }
            resolve(res.rows[0]);
        });
    });
};

const getCreditByValue = async (val) => {
    const query = `SELECT * FROM credits where credit_value=$1`;
    const values = [val];
    return new Promise((resolve, reject) => {
        db.query(query, values, (err, res) => {
            if (err) reject(err);
            if (res.rows.length != 0) {
                console.log(
                    `Row successfully retrieved at ${timeHelper.getCurrentEpoch()}:`
                );
            }
            resolve(res.rows[0]);
        });
    });
};

const addCredit = async (credit) => {
    const query = `
        INSERT INTO
            credits (credit_value)
        VALUES
            ($1)
        ON CONFLICT (credit_value) DO NOTHING
    `;
    const values = [credit];
    return new Promise((resolve, reject) => {
        db.query(query, values, (err, res) => {
            if (err) reject(err);
            resolve("Credit successfully added");
        });
    });
};

const updateCreditByID = async (id, newVal) => {
    const query = `
        UPDATE
            credits
        SET
            credit_value=$2,
            updated_at=(SELECT CURRENT_TIMESTAMP)
        WHERE
            credit_id=$1
    `;
    const values = [id, newVal];
    return new Promise((resolve, reject) => {
        db.query(query, values, (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    });
};

const deleteCreditByID = async (id) => {
    const query = `DELETE FROM credits where credit_id=$1`;
    const values = [id];
    return new Promise((resolve, reject) => {
        db.query(query, values, (err, res) => {
            if (err) reject(err);
            resolve(
                `Credit successfully deleted at ${timeHelper.getCurrentEpoch()}.`
            );
        });
    });
};

export {
    getAllCredits,
    getCreditByID,
    getCreditByValue,
    addCredit,
    updateCreditByID,
    deleteCreditByID,
};
