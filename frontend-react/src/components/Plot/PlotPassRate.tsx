import PropTypes from 'prop-types';
import { Line } from "react-chartjs-2";
import { termNumToName } from "../../utils/conversions";

function PlotPassRate( { courses } ) {

    // const engrPassingGrades = [];
    const passingGrades = ["A", "A-", "B+", "B", "B-", "C+", "C"];
    const labels: Array<string> = [];
    const courseData: Array<number> = [];

    for (const course of courses) {
        const term = termNumToName(course['term']);
        const year = course['year'];

        const gradeData = JSON.parse(course['grade_data']);
        let passRate = 0;
        for (const grade of passingGrades) {
            if (gradeData[grade] !== undefined) {
                passRate += Number(gradeData[grade]);
            }
        }
        
        labels.push(`${term}, ${year}`);
        if (passRate === 0) {
            courseData.push(NaN);
            continue;
        }
        courseData.push(passRate);
    }

    const options = {
        indexAxis: "x" as const,
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: `Pass Rate per Term`,
                font: {
                    size: 15
                }
            },
        },
        pointRadius: 5,
        pointHoverRadius: 7,
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Term, Year"
                }
            },
            y: {
                title: {
                    display: true,
                    text: "Percentage"
                },
                min: 0,
                max: 100,
                ticks: {
                    stepSize: 10,
                },
            }
        }
    }

    const data = {
        labels,
        datasets: [
            {
                data: courseData,
                backgroundColor: [
                    "rgba(0, 150, 0, 0.3)"
                ],
                borderColor: [
                    "rgba(0, 200, 0, 1)"
                ],
                fill: true,
            },
        ],
    }

    return (
        <>
            <Line options={options} data={data} />
        </>
    );
}

PlotPassRate.propTypes = {
    courses: PropTypes.array
}

export default PlotPassRate;