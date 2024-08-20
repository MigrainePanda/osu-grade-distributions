import PropTypes from 'prop-types';
import { Line } from "react-chartjs-2";
import { termNumToName } from "../../utils/conversions";

function PlotNumStudents( { courses } ) {

    const labels: Array<string> = [];
    const courseData: Array<number> = [];

    for (const course of courses) {
        const term = termNumToName(course['term']);
        const year = course['year'];
        const studentTotal = course['student_total'];
        labels.push(`${term}, ${year}`);
        courseData.push(studentTotal);
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
                text: `Number of Students per Term`,
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
                    text: "Number of Students"
                },
                min: 0,
                ticks: {
                    stepSize: 100,
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
                    "rgba(0, 50, 50, 1)"
                ],
                borderColor: [
                    "rgba(0, 0, 150, 1)"
                ]
            },
        ],
    }

    return (
        <>
            <Line options={options} data={data} />
        </>
    );
}

PlotNumStudents.propTypes = {
    courses: PropTypes.array
}

export default PlotNumStudents;