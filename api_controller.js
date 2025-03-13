import db from "./db.js";
import * as yearsHandler from "./utils/controllers/yearController.js";
import * as termsHandler from "./utils/controllers/termsController.js";
import * as creditsHandler from "./utils/controllers/creditsController.js";
import * as subjectsHandler from "./utils/controllers/subjectsController.js";
import * as coursesHandler from "./utils/controllers/coursesController.js";
import * as yearsHasTermsHandler from "./utils/controllers/yearsHasTermsController.js";

async function test(req, res) {
    console.log("query params: ", req.query);
    const query_params = req.query;
    const subject = query_params["subject"];
    const term = query_params["term"];
    const year = query_params["year"];
    if (!subject) {
        res.send("Query parameter 'subject' not provided.");
        return;
    }
    if (!term) {
        res.send("Query parameter 'term' not provided.");
        return;
    }
    if (!year) {
        res.send("Query parameter 'year' not provided.");
        return;
    }
    const reqResp = await coursesHandler.getCourseBySpecification(
        subject,
        term,
        year
    );
    console.log("response: ", reqResp.length);
    res.send(`The provided subject is ${subject}`);
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

async function fetchCoursesBySpecification(req, res) {
    const query_params = req.query;
    const subject = query_params["subject"];
    const term = query_params["term"];
    const year = query_params["year"];
    if (!subject) {
        res.send("Query parameter 'subject' not provided.");
        return;
    }
    if (!term) {
        res.send("Query parameter 'term' not provided.");
        return;
    }
    if (!year) {
        res.send("Query parameter 'year' not provided.");
        return;
    }
    const reqResp = await coursesHandler.getCourseBySpecification(
        subject,
        term,
        year
    );
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
    fetchCoursesBySpecification,
    fetchAllYearsHasTerms,
};
