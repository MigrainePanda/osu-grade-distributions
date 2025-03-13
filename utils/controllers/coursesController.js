import db from "../../db.js";
import * as timeHelper from "../conversions.js";

const getAllCourses = async () => {
    const query = `SELECT * from courses order by long_name`;
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

const getCourseBySpecification = async (subject, term, year) => {
    let values = [subject];
    const query_top = `
        SELECT
            *
        FROM 
            courses
        JOIN 
            years_has_terms on courses.year_term_id = years_has_terms.year_term_id
        WHERE
            short_name = $1
    `;

    let term_str = "";
    if (term === "All") {
        values.push("%");
        term_str = "term_number LIKE $2";
    } else {
        values.push(term);
        term_str = "term_number = $2";
    }
    let year_str = "";
    if (year === "All") {
        values.push(0);
        year_str = `calendar_year > $3`;
    } else {
        values.push(parseInt(year));
        year_str = `calendar_year = $3`;
    }
    let query_mid = ` AND ${term_str} AND ${year_str}`;

    const query_bot = `
        ORDER BY
            courses.long_name
    `;

    const query = query_top + query_mid + query_bot;

    return new Promise((resolve, reject) => {
        db.query(query, values, (err, res) => {
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

export {
    getAllCourses,
    getCourseBySpecification,
    getCourseByID,
    addCourse,
    deleteCourseByID,
};
