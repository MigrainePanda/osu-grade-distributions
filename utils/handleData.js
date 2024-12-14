import { getCurrentEpoch, termNumberToName } from "./conversions.js";
import * as yearsHandler from "./controllers/yearController.js";
import * as termsHandler from "./controllers/termsController.js";
import * as creditsHandler from "./controllers/creditsController.js";
import * as subjectsHandler from "./controllers/subjectsController.js";
import * as coursesHandler from "./controllers/coursesController.js";
import * as yearsHasTermsHandler from "./controllers/yearsHasTermsController.js";

const formatCoursePayload = async (course, year_term_id, subjects, credits) => {
    const short_name = course["short_name"];
    const long_name = course["long_name"];
    const student_total = course["student_total"];
    const grade_pts = course["grade_pts"];
    const gpa_hours = course["gpa_hours"];
    const gpa = course["gpa"];
    const grade_data = course["grade_data"];
    const credit_hours = course["credit_hours"];

    const subject_id = subjects[short_name]["subject_id"];
    const credit_id = credits[credit_hours]["credit_id"];

    const payload = [
        subject_id,
        credit_id,
        year_term_id,
        short_name,
        long_name,
        student_total,
        grade_pts,
        gpa_hours,
        gpa,
        grade_data,
    ];

    return payload;
};

const coursesHelper = async (year, term, courses) => {
    const year_term_info =
        await yearsHasTermsHandler.getYearsHasTermsRelationship(year, term);
    const year_term_id = year_term_info["year_term_id"];

    const subjects_info = await subjectsHandler.getAllSubjects();
    const subjects = {};
    for (const obj of subjects_info) {
        const short = obj.short_name;
        delete obj.short_name;
        subjects[short] = obj;
    }

    const credits_info = await creditsHandler.getAllCredits();
    const credits = {};
    for (const obj of credits_info) {
        const value = obj.credit_value;
        delete obj.credit_value;
        credits[value] = obj;
    }

    for (const course of courses) {
        console.log("add course: ", course["long_name"]);
        const payload = await formatCoursePayload(
            course,
            year_term_id,
            subjects,
            credits
        );
        const res = await coursesHandler.addCourse(payload);
        console.log("res: ", res);
    }
};

const addData = async (data) => {
    // console.log(data);
    const { year, term, credits, subjects, courses } = data;

    const year_res = await yearsHandler.addYear(year);
    const term_res = await termsHandler.addTerm(term, termNumberToName(term));
    for (const idx in credits) {
        const credit_res = await creditsHandler.addCredit(credits[idx]);
    }
    for (const idx in subjects) {
        const subject_res = await subjectsHandler.addSubject(subjects[idx]);
    }

    const res = await coursesHelper(year, term, courses);

    console.log(
        `All data added successfully for ${year}: ${term} at ${getCurrentEpoch()}`
    );
};

const addYearTerms = async (data) => {
    for (const year in data) {
        for (const term of data[year]) {
            const res = await yearsHasTermsHandler.addYearTermRelationship(
                year,
                term
            );
            console.log(res);
        }
    }
};

export { addData, addYearTerms };
