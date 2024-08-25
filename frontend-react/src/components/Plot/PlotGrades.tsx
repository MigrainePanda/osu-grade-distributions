import PropTypes from 'prop-types';
import { Bar } from "react-chartjs-2";

function PlotGrades( { courses } ) {
    const possibleGrades = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F", "W"];
    const labels = possibleGrades;
    const courseData: Array<number> = [];
    let displayedTotalStudents = 0;

    function formatData() {
        for (let i=0; i<possibleGrades.length; i++) {
            courseData.push(0);
        }
    
        for (const course of courses) {
            const studentTotal = course['student_total'];
            const gradeData = JSON.parse(course['grade_data']);
            for (const grade of possibleGrades) {
                if (!(grade in gradeData)) {
                    gradeData[grade] = "0";
                }
            }
    
            let courseStudentTotal = 0;
            for (let i=0; i<possibleGrades.length; i++) {
                const grade = possibleGrades[i];
                const num = Math.round((parseFloat(gradeData[grade])/100 * studentTotal));
                courseData[i] += num;
                courseStudentTotal += num;
            }
            
            displayedTotalStudents += courseStudentTotal;
        }
    }
    formatData();

    const options = {
        indexAxis: "y" as const,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: `Grade Distribution of ${displayedTotalStudents} students`,
                font: {
                    size: 15
                }
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Number of students"
                }
            },
            y: {
                title: {
                    display: true,
                    text: "Grade"
                }
            }
        }
    }

    const data = {
        labels,
        datasets: [
            {
                data: courseData,
                backgroundColor: [
                    "rgba(0, 186, 19, 0.6)",
                    "rgba(51, 199, 15, 0.6)", 
                    "rgba(102, 212, 11, 0.6)", 
                    "rgba(153, 225, 8, 0.6)", 
                    "rgba(204, 238, 4, 0.6)", 
                    "rgba(228, 224, 0, 0.6)", 
                    "rgba(255, 231, 0, 0.6)", 
                    "rgba(255, 201, 0, 0.6)", 
                    "rgba(255, 185, 0, 0.6)", 
                    "rgba(255, 151, 0, 0.6)", 
                    "rgba(255, 100, 0, 0.6)", 
                    "rgba(255, 0, 0, 0.6)",
                    "rgba(0, 0, 0, 0.3)",
                ],
                borderColor: [
                    "rgba(0, 186, 19, 1)",
                    "rgba(51, 199, 15, 1)", 
                    "rgba(102, 212, 11, 1)", 
                    "rgba(153, 225, 8, 1)", 
                    "rgba(204, 238, 4, 1)", 
                    "rgba(228, 224, 0, 1)", 
                    "rgba(255, 231, 0, 1)", 
                    "rgba(255, 201, 0, 1)", 
                    "rgba(255, 185, 0, 1)", 
                    "rgba(255, 151, 0, 1)", 
                    "rgba(255, 100, 0, 1)", 
                    "rgba(255, 0, 0, 1)",
                    "rgba(9, 0, 0, 0.5)",
                ],
                borderWidth: 3,
            },
        ],
    }

    return (
        <>
            <Bar options={options} data={data} />
        </>
    );

}

PlotGrades.propTypes = {
    courses: PropTypes.array
}

export default PlotGrades;