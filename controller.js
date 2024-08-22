import db from "./db.js";

async function fetchAllYears(req, res) {
  const query = `SELECT DISTINCT year FROM courses ORDER BY year+0`;
  const resp = await (new Promise((resolve, reject) => {
    db.query(query, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  }));
  res.send(resp);
}

async function fetchAllTerms(req, res) {
  const query = `SELECT DISTINCT year, term FROM courses ORDER BY year+0, term+0`;
  const resp = await (new Promise((resolve, reject) => {
    db.query(query, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  }));
  res.send(resp);
}

async function fetchAllSubjects(req, res) {
  const query = `SELECT * FROM subjects ORDER BY short`;
  const resp = await (new Promise((resolve, reject) => {
    db.query(query, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  }));
  res.send(resp);
}

async function fetchAllCourses(req, res) {
  const query = `SELECT * FROM courses`;
  const resp = await (new Promise((resolve, reject) => {
    db.query(query, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  }));
  res.send(resp);
}

export {
  fetchAllYears,
  fetchAllTerms,
  fetchAllSubjects,
  fetchAllCourses,
}