import * as fs from "fs";
import * as handleData from "./handleData.js";
import { open } from "node:fs/promises";

const CSV_PATH = "../data";

function formatKey(key) {
    key = key.trim();
    key = key.toLowerCase();
    key = key.replace(" ", "_");
    return key;
}

function formatValue(val) {
    const temp = Number(val);
    if (isNaN(temp)) {
        return val;
    }
    return temp;
}

function toJSON(line, splitter, removeLength = 0) {
    let json = {};
    const line_arr = line
        .substring(0, line.length - removeLength)
        .split(splitter);
    for (const idx in line_arr) {
        const item = line_arr[idx];
        let [key, value] = item.split(": ");
        if (item.substring(item.length - 1) === ",") {
            value = value.substring(0, value.length - 1);
        }
        json[formatKey(key)] = formatValue(value);
    }
    return json;
}

function handleCourseInfo(line) {
    let course = toJSON(line, "  ", 3);
    course["short_name"] = course["course"].split(" ")[0];
    course["long_name"] = course["course"];
    delete course["course"];
    return course;
}

function handleGradeInfo(line) {
    let grade = toJSON(line, ", ");
    const letter = grade["grade"];
    delete grade["grade"];
    return [grade, letter];
}

async function handleFile(file) {
    const subjects = new Set();
    const credits = new Set();
    const courses = [];
    let grades = {};
    let temp_course = null;
    let is_grades = false;

    for await (const line of file.readLines()) {
        const trimmed = line.trim();
        if (is_grades) {
            if (trimmed === ",,,") {
                is_grades = false;
                temp_course["grade_data"] = grades;
                courses.push(temp_course);
                grades = {};
                continue;
            }
            const [grade_json, letter] = handleGradeInfo(trimmed);
            grades[letter] = grade_json;
            continue;
        }

        if (line.substring(0, 6) === "Course") {
            is_grades = true;
            temp_course = handleCourseInfo(line);
            let subject = temp_course["short_name"];
            if (!subjects.has(subject)) {
                subjects.add(subject);
            }
            let credit = temp_course["credit_hours"];
            if (!credits.has(credit)) {
                credits.add(credit);
            }
        }
    }

    return [courses, Array.from(subjects), Array.from(credits)];
}

async function handleFiles(testing = false) {
    const yearTerms = {};

    const files = fs.readdirSync(CSV_PATH);
    let path = "";
    for (const fileName of files) {
        if (fileName == "test.csv" || fileName == "included_data.csv") {
            continue;
        }

        path = `${CSV_PATH}/${fileName}`;
        if (testing) {
            path = `${CSV_PATH}/test.csv`;
        }
        const file = await open(path);

        const [year, term] = fileName
            .substring(0, fileName.length - 4)
            .split("_");
        const [courses, subjects, credits] = await handleFile(file);

        const data = {
            year,
            term,
            courses,
            subjects,
            credits,
        };

        const res = await handleData.addData(data);

        if (!(year in yearTerms)) {
            yearTerms[year] = [];
        }
        yearTerms[year].push(term);

        if (testing) break;
    }

    const res = await handleData.addYearTerms(yearTerms);
}

handleFiles(false);

export default handleFiles;
