import PropTypes from 'prop-types';

function CourseDescription( { courses } ) {

    if (courses.length === 0) {
        return <p className="center-text">There is no data associated with the current selections.</p>;
    }

    // console.log(courses)
    const startYear = courses[0]['year'];
    const endYear = courses[courses.length-1]['year'];
    let yearRange = ""; 
    if (startYear == endYear) {
        yearRange = startYear;
    }
    else {
        yearRange = `${startYear} - ${endYear}`
    }
    const credits = courses[0]['credit_hours'];
    let avgGPA = 0;
    courses.map((course) => {
        avgGPA += course['gpa']
    })
    avgGPA /= courses.length;
    const displayedAvgGPA = avgGPA.toFixed(2);

    return (
        <>
            <h4>Course Information</h4>
            <p>Data Range: {yearRange}</p>
            <p>Credit Hours: {credits}</p>
            <p>Average GPA: {displayedAvgGPA}</p>
        </>
    );
}

CourseDescription.propTypes = {
    courses: PropTypes.array
}

export default CourseDescription;