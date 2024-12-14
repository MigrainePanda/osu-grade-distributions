import db from "../../db.js";
import * as timeHelper from "../conversions.js";

const getAllCourses = async () => {
    const query = `SELECT * from courses`;
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

const getCourseByID = async (id) => {
    const query = `SELECT * FROM courses where course_id=$1`;
    const values = [id];
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

const addCourse = async (payload) => {
    const query = `
        INSERT INTO 
            courses 
            (
                subject_id,
                credit_id,
                year_term_id,
                short_name, 
                long_name, 
                student_total, 
                grade_pts, 
                gpa_hours, 
                gpa, 
                grade_data
            ) 
        VALUES 
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (long_name, year_term_id) DO NOTHING
    `;
    return new Promise((resolve, reject) => {
        db.query(query, payload, (err, res) => {
            if (err) reject(err);
            resolve("Course successfully added");
        });
    });
};

// const updateCourseByID = async (payload) => {
//     const query = `
//         UPDATE
//             subjects
//         SET
//             short_name=$2,
//             updated_at=(SELECT CURRENT_TIMESTAMP)
//         WHERE
//             subject_id=$1
//     `;
//     const values = payload;
//     return new Promise((resolve, reject) => {
//         db.query(query, values, (err, res) => {
//             if (err) reject(err);
//             resolve(res);
//         });
//     });
// };

const deleteCourseByID = async (id) => {
    const query = `DELETE FROM courses where course_id=$1`;
    const values = [id];
    return new Promise((resolve, reject) => {
        db.query(query, values, (err, res) => {
            if (err) reject(err);
            resolve(
                `Course successfully deleted at ${timeHelper.getCurrentEpoch()}.`
            );
        });
    });
};

export { getAllCourses, getCourseByID, addCourse, deleteCourseByID };
