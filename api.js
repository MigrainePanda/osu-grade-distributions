import express from "express";
import * as controller from "./controller.js";
const api = express.Router();

const use = fn => (req, res, next) => 
  Promise.resolve(fn(req, res, next)).catch(next);

api.get("/refresh", use(controller.fetchAllSubjects));

api.get("/terms", use(controller.fetchAllTerms));

api.get("/years", use(controller.fetchAllYears));

api.get("/subjects", use(controller.fetchAllSubjects));

api.get("/courses", use(controller.fetchAllCourses));


export default api;