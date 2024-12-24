import db from "../../db.js";
import * as timeHelper from "../conversions.js";

const getAllYearsHasTerms = async () => {
    const query = `SELECT year_term_id, calendar_year, term_number from years_has_terms order by calendar_year, term_number asc`;
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

const getAllYearsHasTermsByYear = async (year) => {
    const query = `SELECT * from years_has_terms where calendar_year=$1`;
    const values = [year];
    return new Promise((resolve, reject) => {
        db.query(query, values, (err, res) => {
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

const getAllYearsHasTermsByTerm = async (term) => {
    const query = `SELECT * from years_has_terms where term_number=$1`;
    const values = [term];
    return new Promise((resolve, reject) => {
        db.query(query, values, (err, res) => {
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

const getYearsHasTermsRelationship = async (year, term) => {
    const query = `SELECT * from years_has_terms where calendar_year=$1 and term_number=$2`;
    const values = [year, term];
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

const addYearTermRelationship = async (year, term) => {
    const query = `
        INSERT INTO
            years_has_terms (calendar_year, term_number)
        VALUES
            ($1, $2)
        ON CONFLICT (calendar_year, term_number) DO NOTHING
    `;
    const values = [year, term];
    return new Promise((resolve, reject) => {
        db.query(query, values, (err, res) => {
            if (err) reject(err);
            resolve(`Relationship (${year}, ${term}) successfully added`);
        });
    });
};

const deleteYearTermRelationship = async (year, term) => {
    const query = `DELETE FROM years_has_terms where calendar_year=$1 and term_number=$2`;
    const values = [year, term];
    return new Promise((resolve, reject) => {
        db.query(query, values, (err, res) => {
            if (err) reject(err);
            resolve(
                `Relationship successfully deleted at ${timeHelper.getCurrentEpoch()}.`
            );
        });
    });
};

export {
    getAllYearsHasTerms,
    getAllYearsHasTermsByYear,
    getAllYearsHasTermsByTerm,
    getYearsHasTermsRelationship,
    addYearTermRelationship,
    deleteYearTermRelationship,
};
