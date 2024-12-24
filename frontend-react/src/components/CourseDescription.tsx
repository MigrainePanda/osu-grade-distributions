import { AllInfoContext } from "./contexts/AllInfoContext";

import { useContext } from "react";
import PropTypes from "prop-types";
import * as conversionsReact from "../utils/conversions.react.tsx";
import { possibleGrades, passingGrades } from "../utils/letterGrades.tsx";

function CourseDescription({ courses }) {
    const { allCredits, allYearsTerms } = useContext(AllInfoContext);

    if (courses.length === 0) {
        return (
            <div className="content-block-text-container course-desc-block">
                <h1 className="content-block-title block-title">Course Info</h1>
                <p className="content-block-text page-text">
                    There is no data associated with the current selections.
                </p>
            </div>
        );
    }

    // data range
    const startYTID = courses[0]["year_term_id"];
    const endYTID = courses[courses.length - 1]["year_term_id"];

    const startYear = conversionsReact.IDToYear(allYearsTerms, startYTID);
    const endYear = conversionsReact.IDToYear(allYearsTerms, endYTID);
    let yearRange = "";
    if (startYear == endYear) {
        yearRange = String(startYear);
    } else {
        yearRange = `${startYear} - ${endYear}`;
    }

    // passing rate, withdraw rate, student total
    const avgGPAArr: Array<number> = [];
    const avgPassRateArr: Array<number> = [];
    const avgWithdrawRateArr: Array<number> = [];
    const avgStudentTotalArr: Array<number> = [];

    const credits_id = new Set();
    const credits: Array<string> = [];
    for (const course of courses) {
        //credits
        const credit_id = course["credit_id"];
        if (!credits_id.has(credit_id)) {
            credits_id.add(credit_id);
            const credit_value = conversionsReact.IDToCreditValue(
                allCredits,
                credit_id
            );
            credits.push(credit_value);
        }

        // grades
        const gradeData = course["grade_data"];

        // gpa for one course
        avgGPAArr.push(course["gpa"]);

        // passrate for one course
        let passrate = 0;
        for (const i in passingGrades) {
            const grade = possibleGrades[i];
            if (!gradeData[grade]) {
                continue;
            }
            passrate += gradeData[grade]["student_count"];
        }
        passrate = (passrate / course["student_total"]) * 100;
        avgPassRateArr.push(passrate);

        // withdraw rate for one course
        let withdrawRate = 0;
        if (gradeData["W"]) {
            withdrawRate =
                (gradeData["W"]["student_count"] / course["student_total"]) *
                100;
        }
        avgWithdrawRateArr.push(withdrawRate);

        // student count for one course
        avgStudentTotalArr.push(course["student_total"]);
    }

    // compute values for all courses
    const avgGPA =
        avgGPAArr.reduce((acc, curr) => acc + curr, 0) / avgGPAArr.length;
    const displayedAvgGPA = avgGPA.toFixed(2);

    const avgPassRate =
        avgPassRateArr.reduce((acc, curr) => acc + curr, 0) /
        avgPassRateArr.length;
    const displayedAvgPassRate = avgPassRate.toFixed(2);

    const avgWithdrawRate =
        avgWithdrawRateArr.reduce((acc, curr) => acc + curr, 0) /
        avgWithdrawRateArr.length;
    const displayedAvgWithdrawRate = avgWithdrawRate.toFixed(2);

    const studentTotal = avgStudentTotalArr.reduce(
        (acc, curr) => acc + curr,
        0
    );
    const avgStudentTotal = studentTotal / avgStudentTotalArr.length;
    const displayedAvgStudentTotal = avgStudentTotal.toFixed();

    return (
        <>
            <div className="content-block-text-container course-desc-block">
                <h1 className="content-block-title block-title">Course Info</h1>
                <div className="grid-block">
                    <div>
                        <p className="content-block-text page-text">
                            Data Range: {yearRange}
                        </p>
                        <p className="content-block-text page-text">
                            Credit Hours: {credits.join(", ")}
                        </p>
                        <p className="content-block-text page-text">
                            Total Students: {studentTotal}
                        </p>
                    </div>
                    <div>
                        <p className="content-block-text page-text">
                            Avg GPA: {displayedAvgGPA}
                        </p>
                        <p className="content-block-text page-text">
                            Avg Pass Rate: {displayedAvgPassRate}%
                        </p>
                        <p className="content-block-text page-text">
                            Avg Withdraw Rate: {displayedAvgWithdrawRate}%
                        </p>
                        <p className="content-block-text page-text">
                            Avg Number of Students: {displayedAvgStudentTotal}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

CourseDescription.propTypes = {
    courses: PropTypes.array,
};

export default CourseDescription;
