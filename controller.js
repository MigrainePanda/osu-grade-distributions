import db from "./db.js";

async function test(req, res) {
  const query = `SELECT DISTINCT year FROM courses ORDER BY year`;
  const queryResp = await db.query(query);
  const reqResp = await queryResp.rows;
  res.send(reqResp);
}

async function fetchAllYears(req, res) {
  const query = `SELECT DISTINCT year FROM courses ORDER BY year`;
  const queryResp = await db.query(query);
  const reqResp = await queryResp.rows;
  res.send(reqResp);
}

async function fetchAllTerms(req, res) {
  const query = `SELECT DISTINCT year, term FROM courses ORDER BY year, term`;
  const queryResp = await db.query(query);
  const reqResp = await queryResp.rows;
  res.send(reqResp);
}

async function fetchAllSubjects(req, res) {
  const query = `SELECT * FROM subjects ORDER BY short`;
  const queryResp = await db.query(query);
  const reqResp = await queryResp.rows;
  res.send(reqResp);
}

async function fetchAllCourses(req, res) {
  const query = `SELECT * FROM courses`;
  const queryResp = await db.query(query);
  const reqResp = await queryResp.rows;
  res.send(reqResp);
}

export {
  test,
  fetchAllYears,
  fetchAllTerms,
  fetchAllSubjects,
  fetchAllCourses,
}