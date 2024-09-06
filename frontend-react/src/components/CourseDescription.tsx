import PropTypes from 'prop-types';

function CourseDescription( { courses } ) {

    if (courses.length === 0) {
        return (
            <div className="content-block-text-container course-desc-block">
                <h1 className="content-block-title block-title">Course Info</h1>
                <p className="content-block-text page-text">There is no data associated with the current selections.</p>
            </div>
        );
    }
    // console.log(courses)

    // data range
    const startYear = courses[0]['year'];
    const endYear = courses[courses.length-1]['year'];
    let yearRange = ""; 
    if (startYear == endYear) {
        yearRange = startYear;
    }
    else {
        yearRange = `${startYear} - ${endYear}`
    }

    // credits
    const credits = courses[0]['credit_hours'];

    // passing rate, withdraw rate, student total
    const passingGrades = ["A", "A-", "B+", "B", "B-", "C+", "C"];
    const avgPassRateArr: Array<number> = [];
    const withdrawRateArr: Array<number> = [];
    const studentTotalArr: Array<number> = [];
    
    for (const course of courses) {
        const gradeData = JSON.parse(course['grade_data']);
        let passRate = 0;
        for (const grade of passingGrades) {
            if (gradeData[grade] !== undefined) {
                passRate += Number(gradeData[grade]);
            }
        }
        if (gradeData["W"] !== undefined) {
            withdrawRateArr.push(Number(gradeData["W"]));
        }
        avgPassRateArr.push(passRate);
        studentTotalArr.push(Number(course['student_total']));
    }

    const avgPassRate = avgPassRateArr.reduce((acc, curr) => acc + curr, 0)/avgPassRateArr.length;
    const displayedAvgPassRate = avgPassRate.toFixed(2);

    const withdrawRate = withdrawRateArr.reduce((acc, curr) => acc + curr, 0)/withdrawRateArr.length;
    const displayedWithdrawRate = withdrawRate.toFixed(2);

    const studentTotal = studentTotalArr.reduce((acc, curr) => acc + curr, 0)/studentTotalArr.length;
    const displayedStudentTotal = studentTotal.toFixed();


    return (
        <>
            <div className="content-block-text-container course-desc-block">
                <h1 className="content-block-title block-title">Course Info</h1>
                <p className="content-block-text page-text">Data Range: {yearRange}</p>
                <p className="content-block-text page-text">Credit Hours: {credits}</p>
                <p className="content-block-text page-text">Avg Pass Rate: {displayedAvgPassRate}%</p>
                <p className="content-block-text page-text">Avg Withdraw Rate: {displayedWithdrawRate}%</p>
                <p className="content-block-text page-text">Avg Number of Students: {displayedStudentTotal}</p>
            </div>
        </>
    );
}

CourseDescription.propTypes = {
    courses: PropTypes.array
}

export default CourseDescription;