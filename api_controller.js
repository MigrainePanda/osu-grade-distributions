import db from "./db.js";
import * as yearsHandler from "./utils/controllers/yearController.js";
import * as termsHandler from "./utils/controllers/termsController.js";
import * as creditsHandler from "./utils/controllers/creditsController.js";
import * as subjectsHandler from "./utils/controllers/subjectsController.js";
import * as coursesHandler from "./utils/controllers/coursesController.js";
import * as yearsHasTermsHandler from "./utils/controllers/yearsHasTermsController.js";

async function test(req, res) {
    const query = `SELECT * FROM courses`;
    const queryResp = await db.query(query);
    const reqResp = await queryResp.rows;
    res.send(reqResp);
}

async function fetchAllYears(req, res) {
    const reqResp = await yearsHandler.getAllYears();
    res.send(reqResp);
}

async function fetchAllTerms(req, res) {
    const reqResp = await termsHandler.getAllTerms();
    res.send(reqResp);
}

async function fetchAllCredits(req, res) {
    const reqResp = await creditsHandler.getAllCredits();
    res.send(reqResp);
}

async function fetchAllSubjects(req, res) {
    const reqResp = await subjectsHandler.getAllSubjects();
    res.send(reqResp);
}

async function fetchAllCourses(req, res) {
    const reqResp = await coursesHandler.getAllCourses();
    res.send(reqResp);
}

async function fetchAllYearsHasTerms(req, res) {
    const reqResp = await yearsHasTermsHandler.getAllYearsHasTerms();
    res.send(reqResp);
}

export {
    test,
    fetchAllYears,
    fetchAllTerms,
    fetchAllCredits,
    fetchAllSubjects,
    fetchAllCourses,
    fetchAllYearsHasTerms,
};
