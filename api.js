import express from "express";
import * as controller from "./controller.js";
const api = express.Router();

const use = fn => (req, res, next) => 
  Promise.resolve(fn(req, res, next)).catch(next);

api.get("/api/refresh", use(controller.fetchAllSubjects));

api.get("/api/terms", use(controller.fetchAllTerms));

api.get("/api/years", use(controller.fetchAllYears));

api.get("/api/subjects", use(controller.fetchAllSubjects));

api.get("/api/courses", use(controller.fetchAllCourses));


export default api;