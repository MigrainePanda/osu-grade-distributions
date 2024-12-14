import db from "../../db.js";
import * as timeHelper from "../conversions.js";

const getAllSubjects = async () => {
    const query = `SELECT * from subjects`;
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

const getSubjectByID = async (id) => {
    const query = `SELECT * FROM subjects where subject_id=$1`;
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

const getSubjectByName = async (name) => {
    const query = `SELECT * FROM subjects where short_name=$1`;
    const values = [name];
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

const addSubject = async (subject) => {
    const query = `
        INSERT INTO 
            subjects (short_name) 
        VALUES 
            ($1) 
        ON CONFLICT (short_name) DO NOTHING
    `;
    const values = [subject];
    return new Promise((resolve, reject) => {
        db.query(query, values, (err, res) => {
            if (err) reject(err);
            resolve("Subject successfully added");
        });
    });
};

const updateSubjectByID = async (id, newName) => {
    const query = `
        UPDATE 
            subjects 
        SET 
            short_name=$2, 
            updated_at=(SELECT CURRENT_TIMESTAMP) 
        WHERE 
            subject_id=$1
    `;
    const values = [id, newName];
    return new Promise((resolve, reject) => {
        db.query(query, values, (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    });
};

const deleteSubjectByID = async (id) => {
    const query = `DELETE FROM subjects where subject_id=$1`;
    const values = [id];
    return new Promise((resolve, reject) => {
        db.query(query, values, (err, res) => {
            if (err) reject(err);
            resolve(
                `Subject successfully deleted at ${timeHelper.getCurrentEpoch()}.`
            );
        });
    });
};

export {
    getAllSubjects,
    getSubjectByID,
    getSubjectByName,
    addSubject,
    updateSubjectByID,
    deleteSubjectByID,
};
