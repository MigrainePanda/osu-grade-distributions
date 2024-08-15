import {db} from "./setup.js"
import * as helper from "./helper.js";

const checkRefresh = async () => {
  const refreshTimer = 1; //! change to some different time
  const currTime = helper.getCurrentEpoch();
  const query = `SELECT last_updated 
                FROM token 
                WHERE (${currTime}-last_updated) > ${refreshTimer}`
  return new Promise((resolve, reject) => {
    db.query(query, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

const refreshToken = async () => {
  const currTime = Math.round((new Date()).getTime() / 1000);
  const query = `UPDATE token SET last_updated=${currTime} WHERE id=${1}`;
  return new Promise((resolve, reject) => {
    db.query(query, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

const addSubjectData = async (subject) => {
  const query = `INSERT IGNORE INTO subjects (short, last_updated) VALUES (?, ?)`;
  const values = [subject, helper.getCurrentEpoch()];
  return new Promise((resolve, reject) => {
    db.query(query, values, (err, res) => {
        if (err) reject(err);
        resolve(res);
    });
  });
}
    
const addCourseData = async (course, year, term) => {
  course["Subject"] = course["Course"].substring(0, course["Course"].indexOf(" "));

  const columns = `(short, subject, year, term, student_total, credit_hours, grade_pts, gpa_hours, gpa, last_updated, grade_data)`;
  const str = "?, ".repeat((columns.match(/,/g) || []).length+1);
  const numValues = str.substring(0, str.length-2);

  let gradeData = {};
  for (const key of Object.keys(course)) {
    if (key in helper.POSSIBLE_GRADES) {
      gradeData[key] = course[key];
    }
  }
  gradeData = JSON.stringify(gradeData);

  const query = `INSERT IGNORE INTO courses ${columns} VALUES (${numValues})`;
  const values = [
    course["Course"],
    course["Subject"],
    year,
    term,
    course["Student Total"],
    course["Credit Hours"],
    course["Grade Pts"],
    course["GPA Hours"],
    course["GPA"],
    helper.getCurrentEpoch(),
    gradeData
  ];

  return new Promise((resolve, reject) => {
    db.query(query, values, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

const getAllYears = async () => {
  const query = `SELECT DISTINCT year FROM courses ORDER BY year+0`;
  return new Promise((resolve, reject) => {
    db.query(query, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

const getAllTerms = async () => {
  const query = `SELECT DISTINCT year, term FROM courses ORDER BY year+0, term+0`;
  return new Promise((resolve, reject) => {
    db.query(query, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

const getAllTermsByYear = async (year) => {
  const query = `SELECT DISTINCT year, term FROM courses WHERE year="${year}" ORDER BY year+0, term+0`;
  return new Promise((resolve, reject) => {
    db.query(query, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

const getAllSubjects = async () => {
  const query = `SELECT * FROM subjects`;
  return new Promise((resolve, reject) => {
    db.query(query, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

const getAllCourses = async () => {
  const query = `SELECT * FROM courses`;
  return new Promise((resolve, reject) => {
    db.query(query, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

export { 
  checkRefresh, 
  refreshToken, 
  addSubjectData, 
  addCourseData, 
  getAllYears, 
  getAllTerms,
  getAllTermsByYear,
  getAllSubjects, 
  getAllCourses
};