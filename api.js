import express from "express";
import * as controller from "./api_controller.js";
const api = express.Router();

const use = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

api.get("/api/test", use(controller.test));

api.get("/api/years", use(controller.fetchAllYears));

api.get("/api/terms", use(controller.fetchAllTerms));

api.get("/api/credits", use(controller.fetchAllCredits));

api.get("/api/subjects", use(controller.fetchAllSubjects));

api.get("/api/courses", use(controller.fetchCoursesBySpecification));

api.get("/api/years-has-terms", use(controller.fetchAllYearsHasTerms));

export default api;
